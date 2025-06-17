import { ImageResponse } from "@vercel/og"
import { ImageResponseOptions } from "next/server"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const fontDataMedium = await fetch(
    new URL("https://github.com/vercel/geist-font/raw/refs/heads/main/fonts/Geist/ttf/Geist-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer())

  const fontDataRegular = await fetch(
    new URL("https://github.com/vercel/geist-font/raw/refs/heads/main/fonts/Geist/ttf/Geist-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer())

  const handle = searchParams.get("handle")
  const name = searchParams.get("name")
  const profilePictureUrl = searchParams.get("profilePictureUrl")


  const pageConfig = {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Typewriter",
        data: fontDataRegular,
        style: "normal",
        weight: 400,
      },
      {
        name: "Typewriter",
        data: fontDataMedium,
        style: "normal",
        weight: 500,
      },
      // {
      //   name: "Typewriter",
      //   data: fontDataBold,
      //   style: "normal",
      //   weight: 700,
      // },
    ],
  } as ImageResponseOptions


  if (!handle) {
    return new ImageResponse(<div tw="flex items-center justify-center w-full h-full bg-[#1e1e1e] p-8 text-white flex-col">
      <div tw="text-white text-4xl font-bold pb-12">Page not found</div>
      <img src="https://beta.0xfm.com/img/logos/pingpad.svg" tw="h-8" />
    </div>, pageConfig)
  }

  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col justify-end p-10 px-20 bg-[#1e1e1e]">
        <div tw="flex items-center justify-center w-56 h-56 overflow-hidden rounded-full">
          <img src={profilePictureUrl} tw="rounded-full" />
        </div>
        <div tw="flex flex-col">
          <div tw="flex flex-col justify-center pt-6">
            <div tw="text-white text-left text-7xl font-bold flex"
            style={{
              lineHeight: '70px',
            }}>
              {name.trim()}
            </div>
          </div>
          <div tw="flex items-center opacity-75">
            <img src="http://localhost:3000/logo-white.svg" tw="h-10" 
              style={{
                transform: 'translateY(2px)',
              }}
            />
            <div tw={`text-white text-5xl font-light flex py-2 pl-2`}>
              {handle}
            </div>
          </div>
          {/* <img src="https://beta.0xfm.com/img/logos/pingpad.svg" tw="h-16" /> */}
        </div>
      </div>
    ),
    pageConfig
  )
}
