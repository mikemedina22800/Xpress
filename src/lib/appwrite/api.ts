import { ID } from 'appwrite'
import { INewUser, INewPost, IUser } from "@/types";
import { account, appwriteConfig, databases, avatars, storage} from './config';
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

export const saveUserToDB = async (id: string, user: {email: string; name: string; username: string; photo: URL, id:string}) => {
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
      saveUserToDB(newUser.$id, {email: user.email, name:user.name, username: user.username, photo:avatars.getInitials(user.name), id:newUser.$id}).then(() => {
        account.createEmailSession(user.email, user.password).then(() => {
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

export const makePost = async (post:INewPost) => {
  try {
    await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.postsCollectionId, ID.unique(), post).then(() => {
      toast('Post uploaded!', {theme: 'light'})
    })
  } catch(err) {
    toast.error('Post failed to upload.')
    console.log(err)
  }
}

export const uploadImage = async (id:string, file:File) => {
  const accountID = ID.unique()
  try {
    storage.createFile(id, accountID, file)
  } catch(err) {
    console.log(err)
  }
}