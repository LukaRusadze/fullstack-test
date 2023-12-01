import { Header } from "~/components/header";
import Image from "next/image";
import Banner from "~/public/banner.jpg";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <div className="group transition-opacity relative">
          <Image
            src={Banner}
            alt="banner"
            priority
            className="w-full h-[500px] object-cover opacity-60 group-hover:opacity-100 duration-500"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center">
            <h1 className="px-[5%] text-6xl font-bold text-black group-hover:text-white duration-500 transition-all drop-shadow-2xl">
              Where the Elements of Art
              <br />
              Ignite Creativity.
            </h1>
          </div>
        </div>
      </Header>
      {children}
    </>
  );
}
