export default function LoginLayout({
 children,
}: {
 children: React.ReactNode
}) {
 return <section className="bg-[#fbf8f3] p-10 md:h-screen flex justify-center items-center">{children}</section>
}