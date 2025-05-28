import { AtSign, Github, Heart, InfoIcon, LogInIcon } from "lucide-react";
import { EmailSubscription } from "~/components/EmailSubscription";
import { LensTextDark, LensTextLight } from "~/components/Icons";
import Link from "~/components/Link";
import { ThemeToggle } from "~/components/ThemeToggle";
import { FadeIn } from "~/components/Transitions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const LandingPage = () => {
  return (
    <div className={"flex flex-col min-h-screen mx-auto max-w-5xl min-w-0"}>
      <div className="w-full h-full">
        <div className="p-4 rounded-t-none flex place-content-between">
          <Link className="flex flex-row gap-4 items-center " href="/">
            <AtSign className="dark:drop-shadow-glow-sm drop-shadow-md" size={35} />
            <div className="text-3xl font-semibold dark:drop-shadow-glow drop-shadow-md  -mt-1.5 -ml-2">pingpad</div>
          </Link>

          <div className="flex gap-4 items-center ">
            <ThemeToggle />
            <div className="dark:drop-shadow-glow drop-shadow-md ">
              <Link href="/home">
                <Button variant="default" size="sm_icon">
                  <div className="hidden sm:flex mr-2">Join</div>
                  <LogInIcon />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 px-auto grow items-center justify-center py-10 mt-16 text-3xl p-8 text-center drop-shadow-md dark:drop-shadow-glow place-items-center flex-col gap-6">
          <div className="col-span-1 flex flex-col gap-2">
            <FadeIn className="duration-1000 delay-100">
              <h1>
                a <b>better </b> decentralized social,
              </h1>
            </FadeIn>
            <FadeIn className="duration-1000 delay-300">
              <h1>
                staying <b>out of the way</b>
              </h1>
            </FadeIn>
            <FadeIn className="duration-1000 delay-500">
              <h1>
                to reach <b>your</b> people
              </h1>
            </FadeIn>
          </div>

          <FadeIn className="duration-1000 delay-1000">
            <div className="col-span-1 flex flex-row gap-2 items-center justify-center">
              <h1>built on</h1>
              <Link
                className="hover:underline -mt-24 -mb-24  flex items-center gap-2 relative"
                href={"https://lens.xyz"}
              >
                <div className="dark:hidden">
                  <LensTextDark />
                </div>
                <div className="dark:flex hidden">
                  <LensTextLight />
                </div>
                <div className="absolute bottom-10 right-5 text-xs font-bold transform  border border-primary/80 text-primary px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  Now on v3!
                </div>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* <FadeIn className="">
          <div className="w-full p-8 mt-24 text-center drop-shadow-lg dark:drop-shadow-glow flex flex-col justify-center items-center">
            <div className="text-xl font-bold flex flex-col gap-4">
              {/* Now on Lens v3! moved to Lens logo */}
        {/* <EmailSubscription /> */}
        {/* </div>
          </div> */}

        {/* <FadeIn className="">
          <Card className="hover:bg-card flex flex-col gap-4 place-items-center mx-auto w-full p-4 my-32">
            <CardHeader>
              <CardTitle> FAQ </CardTitle>
            </CardHeader>
            <CardContent className="w-full max-w-3xl">
              <div className="w-full max-w-3xl">
                <Accordion type="single">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Current status?</AccordionTrigger>
                    <AccordionContent>
                      In open beta. We are currently fixing bugs and adding new features before the v1.0 release. <br />{" "}
                      <br />
                      We are waiting for your{" "}
                      <a className="underline" href="https://github.com/pingpad-io/ping">
                        feedback
                      </a>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it any good?</AccordionTrigger>
                    <AccordionContent>
                      Yes. <Link href={"/home"}>check it out</Link> for yourself.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </FadeIn> */}

        <FadeIn className="">
          <div className="flex flex-col md:flex-row gap-8 place-items-center justify-center p-4 drop-shadow-lg dark:drop-shadow-glow my-20">
            <Link href="https://kualta.dev">
              <Button variant="ghost" className="p-1 px-4 text-lg gap-4 flex flex-row w-fit rounded-full">
                <Heart /> by kualta
              </Button>
            </Link>
            <Link href="https://github.com/pingpad-io/ping">
              <Button variant="ghost" className="p-1 px-4 text-lg gap-4 flex flex-row w-fit rounded-full">
                <Github /> github
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="p-1 px-4 text-lg gap-4 flex flex-row w-fit rounded-full">
                <InfoIcon /> about
              </Button>
            </Link>
            {/* <Link href="https://ping.kualta.dev/policy">
            <Button variant="ghost" className="p-1 px-4 text-lg gap-4 flex flex-row w-fit rounded-full">
              <Cookie /> Privacy
            </Button>
          </Link> */}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default LandingPage;
