type PageTitleProps = {
  title: string
}

export function PageTitle({ title }: PageTitleProps) {
  return <h1 className="truncate text-lg font-semibold text-foreground lg:text-xl">{title}</h1>
}
