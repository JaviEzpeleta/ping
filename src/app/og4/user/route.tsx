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
      <img src="https://pingpad.io/logo.png" tw="h-8" />
    </div>, pageConfig)
  }

  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col items-center justify-center">
        <div tw="flex flex-col w-full h-full relative items-center justify-center bg-[#1e1e1e] p-8">
          <div tw="flex items-center justify-center w-56 h-56 overflow-hidden rounded-full">
            <img src={profilePictureUrl} tw="rounded-full" />
          </div>
          <div tw="flex justify-end flex-col items-center w-full">
            <div tw="flex flex-col justify-center pt-16 items-center">
              <div tw="flex flex-col justify-center h-[80px]">
                <div tw="text-white text-center text-6xl font-bold flex"
                style={{
                  lineHeight: '70px',
                }}>
                  {name.trim()}
                </div>
              </div>
              <div tw={`text-white/65 text-3xl font-light flex py-6`}>
                pingpad.io/u/{handle}
              </div>
              <img src="https://pingpad.io/logo.png" tw="h-16" />
            </div>
          </div>
        </div>
      </div>
    ),
    pageConfig
  )
}
