import { ID } from 'appwrite'
import { INewUser } from "@/types";
import { account, appwriteConfig, databases } from './config';
import { toast } from 'react-toastify';

export const signInAccount = async (user: {email: string; password: string; }, navigate: (url: string) => void) => {
  try {
    account.createEmailSession(user.email, user.password).then(() => {
      navigate('/?new_session=true')
    })
  } catch(err) {
    console.log(err)
    toast.error('Invalid email or password.')
  }
}

export const saveUserToDB = async (id: string, user: {email: string; name: string; username: string;}) => {
  try {
    databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, id, user)
  } catch(err) {
    console.log(err)
  }
}

export const createUserAccount = async (user: INewUser, navigate: (url: string) => void) => {
  const accountID = ID.unique()
  try {
      account.create(accountID, user.email, user.password, user.name).then((newUser) => {
      saveUserToDB(newUser.$id, {email: user.email, name:user.name, username: user.username}).then(() => {
        signInAccount({ email:user.email, password:user.password }, navigate).then(() => {
          navigate('/?first_session=true')
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
