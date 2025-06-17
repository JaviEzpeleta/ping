import { ImageResponse } from "@vercel/og"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const fontData = await fetch(
    new URL("https://asklc.xyz/fonts/TYPEWR__.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer())

  const handle = searchParams.get("handle")
  const profilePictureUrl = searchParams.get("profilePictureUrl")

  if (!handle) {
    return new ImageResponse(<div>No title</div>, {
      width: 1400,
      height: 750,
    })
  }

  // const fontSize = handle.length > 10 ? "text-6xl" : "text-8xl"
  const fontSize = "text-8xl"

  return new ImageResponse(
    (
      // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "green",
        }}
      >
        <div tw="flex w-full h-full relative items-center justify-center bg-black">
          <div tw="bg-black rounded-xl overflow-hidden z-0 flex w-full h-full justify-center items-center">
            <img src="https://beta.0xfm.com/og/pingpad-bg.png" tw="h-full border-4 rounded-xl border-black" />
          </div>
          <div tw="absolute z-10 top-0 left-0 w-full h-full flex">
            <div tw="flex z-10 justify-center items-center w-full h-full p-8 pb-32">
              <img src={profilePictureUrl} tw="h-full rounded-lg border-4 border-black" />
            </div>
            
          </div>
          <div tw="absolute z-20 top-0 left-0 w-full h-full flex">
          <div tw="flex justify-end flex-col py-8 items-center w-full">
              <div tw="flex flex-col justify-center">
                <div tw={`text-black/80 ${fontSize} font-bold flex`}>{handle}</div>
                {/* <div tw="text-white text-2xl font-bold">@{handle}</div> */}
              </div>
            </div>
          </div>
        
          {/* <div tw="bg-black flex w-full h-full justify-center items-center">
            <img src="https://asklc.xyz/img/ogbg.png" tw="h-full opacity-80" />
          </div>

          <div
            tw="flex flex-col text-5xl absolute w-[1400px] px-6 h-[750px]"
            style={{
              fontFamily: '"Typewriter"',
            }}
          >
            <div tw="flex gap-0 pt-2 pb-12 flex-col px-40">
              <div
                tw="text-white w-full mt-6 px-6 flex items-center justify-start text-[132px] leading-[108px]"
                // add text shadow
                style={{
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 1)",
                }}
              >
                {handle}
              </div>
              <img src={profilePictureUrl} tw="w-24" />
            </div>
          </div> */}
        </div>
      </div>
    ),
    {
      width: 1400,
      height: 750,
      fonts: [
        {
          name: "Typewriter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  )
}
