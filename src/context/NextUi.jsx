"use client"
// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";
import {useFavicon} from 'react-use'

export default function App({children}) {
  // 2. Wrap NextUIProvider at the root of your app

  useFavicon('https://cdn.icon-icons.com/icons2/3377/PNG/512/n_letter_icon_212411.png');
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}