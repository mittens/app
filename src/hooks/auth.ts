import { FIREBASE_CALLBACK_URL, GITHUB_CLIENT_ID } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
import gql from 'graphql-tag'
import { useCallback, useEffect, useState } from 'react'
import { Linking, Platform } from 'react-native'
import { getUniqueId } from 'react-native-device-info'
import InAppBrowser, { RedirectResult } from 'react-native-inappbrowser-reborn'

import { client } from '../lib'
import { useAuth } from '../store'
import {
  Mutation,
  MutationLoginArgs,
  MutationSignInArgs,
  MutationSignOutArgs
} from '../types'

type SignInReturns = {
  loading: boolean

  signIn: () => Promise<void>
}

export const useSignIn = (): SignInReturns => {
  const [, { init }] = useAuth()

  const [loading, setLoading] = useState(false)

  const handler = useCallback(
    async (url: string) => {
      try {
        const [, code] = url.split('code=')

        const {
          data: {
            login: { token: githubToken }
          }
        } = await client.mutate<Pick<Mutation, 'login'>, MutationLoginArgs>({
          mutation: gql`
            mutation login($code: String!) {
              login(code: $code) {
                token
              }
            }
          `,
          variables: {
            code
          }
        })

        const deviceId = getUniqueId()

        await messaging().requestPermission()

        const pushToken = await messaging().getToken()

        const {
          data: {
            signIn: { token: authToken }
          }
        } = await client.mutate<Pick<Mutation, 'signIn'>, MutationSignInArgs>({
          mutation: gql`
            mutation signIn($data: SignInInput!) {
              signIn(data: $data) {
                token
              }
            }
          `,
          variables: {
            data: {
              deviceId,
              githubToken,
              pushToken
            }
          }
        })

        await AsyncStorage.setItem('@githubToken', githubToken)
        await AsyncStorage.setItem('@authToken', authToken)

        await init()
      } catch {
        setLoading(false)
      }
    },
    [init]
  )

  useEffect(() => {
    Linking.addEventListener('url', ({ url }) => handler(url))

    return () => {
      Linking.removeEventListener('url', ({ url }) => handler(url))
    }
  }, [handler])

  const signIn = useCallback(async () => {
    setLoading(true)

    try {
      const { type, url } = (await InAppBrowser.openAuth(
        `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=notifications&allow_signup=false`,
        FIREBASE_CALLBACK_URL
      )) as RedirectResult

      if (type === 'success') {
        handler(url)
      } else if (Platform.OS === 'ios') {
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }, [handler])

  return {
    loading,
    signIn
  }
}

type SignOutReturns = {
  loading: boolean

  signOut: () => Promise<void>
}

export const useSignOut = (): SignOutReturns => {
  const [, { init }] = useAuth()

  const [loading, setLoading] = useState(false)

  const signOut = useCallback(async () => {
    setLoading(true)

    try {
      const deviceId = getUniqueId()

      await client.mutate<Pick<Mutation, 'signOut'>, MutationSignOutArgs>({
        mutation: gql`
          mutation signOut($data: SignOutInput!) {
            signOut(data: $data)
          }
        `,
        variables: {
          data: {
            deviceId
          }
        }
      })

      await AsyncStorage.removeItem('@githubToken')
      await AsyncStorage.removeItem('@authToken')

      await init()
    } catch {
      setLoading(false)
    }
  }, [init])

  return {
    loading,
    signOut
  }
}
