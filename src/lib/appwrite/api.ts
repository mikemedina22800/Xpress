import { ID } from 'appwrite'
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';
import { toast } from 'react-toastify';

export const signInAccount = async (user: {email: string; password: string; }) => {
  try {
    account.createEmailSession(user.email, user.password).then((user) => {
      return user
    })
  } catch(err) {
    console.log(err)
    toast.error('Invalid email or password.')
  }
}

export const saveUserToDB = async (user: {accountID: string; email: string; name: string; imageUrl: URL; username: string}) => {
  try {
    databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, ID.unique(), user)
  } catch(err) {
    console.log(err)
  }
}

export const createUserAccount = async (user: INewUser) => {
  const accountID = ID.unique()
  try {
    account.create(accountID, user.email, user.password, user.name).then(() => {
      saveUserToDB({accountID, name:user.name, email: user.email, username: user.username, imageUrl: avatars.getInitials(user.name)}).then(() => {
        signInAccount({ email:user.email, password:user.password})
      })
    })
  } catch(err) {
    console.log(err)
    toast.error('Email is associated with an existing account.')
  }
}
