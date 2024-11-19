
type propsConteiner = {
    children: React.ReactNode;
    className?: string;
}

export default function Conteiner( { children, className }: propsConteiner ) {
  return (
    <div className={className ? className : " my-3 w-auto mx-auto"}>
      {children}
    </div>
  )
}
