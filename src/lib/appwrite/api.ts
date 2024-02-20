import { ID } from 'appwrite'
import { INewUser } from "@/types";
import { account, appwriteConfig, databases } from './config';
import { toast } from 'react-toastify';

export const signInAccount = async (user: {email: string; password: string; }) => {
  try {
    await account.createEmailSession(user.email, user.password).then(() => {
      toast.success('Login successful.')
      location.reload()
    })
  } catch(err) {
    console.log(err)
    toast.error('Invalid email or password.')
  }
}

export const saveUserToDB = async (id: string, user: {email: string; name: string; username: string;}) => {
  try {
    await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, id, user)
  } catch(err) {
    console.log(err)
  }
}

export const createUserAccount = async (user: INewUser) => {
  const accountID = ID.unique()
  try {
    await account.create(accountID, user.email, user.password, user.name).then((newUser) => {
      saveUserToDB(newUser.$id, {email: user.email, name:user.name, username: user.username}).then(() => {
        signInAccount({ email:user.email, password:user.password }).then(() => {
          toast.success('Account creation successful.')
          location.reload()
        })
      })
    })
  } catch(err) {
    console.log(err)
    toast.error('Email is associated with an existing account.')
  }
}

export const signOutAccount = async () => {
  try {
    await account.deleteSession("current").then(() => {
      location.reload()
    })
  } catch(err) {
    console.log(err)
  }
}
