import HeroSlider from '../components/HeroSlider'
import CategoryRow from '../components/CategoryRow'
import { useEvents } from '../api/hooks'
import { CATEGORIES } from '../i18n'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <div className="content-container">
        <CategorySection key="all" slug="all" titleKey="allUpcomingEvents" />
        {CATEGORIES.map(({ slug, arKey }) => (
          <CategorySection key={slug} slug={slug} titleKey={arKey} />
        ))}
      </div>
    </>
  )
}

function CategorySection({
  slug,
  titleKey,
}: {
  slug: string
  titleKey: string
}) {
  // slug "all" = جميع الأحداث القادمة (كل المناسبات من كل الفئات)
  const { data: events = [], isLoading } = useEvents(
    slug === 'all' ? {} : { category: slug }
  )

  return (
    <CategoryRow
      titleKey={titleKey}
      slug={slug}
      items={events}
      isLoading={isLoading}
    />
  )
}
