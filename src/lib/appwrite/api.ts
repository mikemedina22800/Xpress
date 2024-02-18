import { ID, Query } from 'appwrite'
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from './config';
import { toast } from 'react-toastify';

export async function signInAccount(user: {email: string; password: string; }) {
  try {
    const session = await account.createEmailSession(user.email, user.password)
    return session;
  } catch(err) {
    console.log(err)
    toast.error('Invalid email or password.')
  }
}

export async function createUserAccount(user: INewUser) {
  const accountId = ID.unique()
  try {
    account.create(accountId, user.email, user.password, user.name).then(() => {
      saveUserToDB({accountId: accountId, name: user.name, email: user.email, username: user.username, imageUrl:  avatars.getInitials(user.name)}).then(() => {
        account.createEmailSession(user.email, user.password)
      })
    })
  } catch(err) {
    console.log(err)
    toast.error('Email is associated with an existing account.')
  }
}

export async function saveUserToDB(user: {accountId: string; email: string; name: string; imageUrl: URL; username: string}) {
  try {
    databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    )
  } catch(err) {
    console.log(err)
    toast.error("Some information failed to upload.")
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    return currentUser.documents[0]
  } catch {
    return null
  }
}