type PageTitleProps = {
  title: string
}

export function PageTitle({ title }: PageTitleProps) {
  return <h1 className="truncate font-heading text-lg font-semibold text-foreground lg:text-xl">{title}</h1>
}
