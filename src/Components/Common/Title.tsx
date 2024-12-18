type propsTile = {
    children: React.ReactNode;
}

export default function Title({ children }: propsTile) {
  return (
    <div className="w-auto mx-auto">
        <h1 className="text-4xl flex justify-center">{children}</h1>
    </div>
  )
}
