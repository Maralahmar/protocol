const LOCATIONS = ['RUH BLVD CITY', 'BLVD WORLD', 'The Groves', 'KINGDOM ARENA', 'VIA RIYADH']
const VENUES = [
  'Grand Hall Center', 'Sky Lounge', 'Desert Oasis Venue', 'Coastal Events Space',
  'Royal Theater', 'Garden Pavilion', 'Urban Stage', 'Heritage Plaza',
  'Modern Arena', 'Cultural Center', 'Beach Resort Hall', 'Mountain View Club',
  'City Square', 'Art Gallery Space', 'Rooftop Terrace'
]
const CATEGORIES = ['events', 'restaurants', 'activity', 'concerts', 'experiences', 'entertainment', 'theatrical', 'entry', 'shop', 'cinemas']

const EVENT_TITLES_AR: Record<string, string[]> = {
  events: ['معرض الفن المعاصر', 'يوم العائلة', 'ورشة الطهي', 'ملتقى ريادة الأعمال', 'احتفالية الربيع'],
  restaurants: ['مطعم الشرقية', 'كافيه الساحل', 'مطعم الطهي الحي', 'مقهى الوسط', 'مطعم البستان'],
  activity: ['تسلق الجبال', 'رحلة الصحراء', 'ورشة الرسم', 'رياضة التجديف', 'جولة ثقافية'],
  concerts: ['حفل أحمد المغيري', 'ليلة موسيقية', 'حفل غنائي', 'عرض العود', 'ليلة جاز'],
  experiences: ['تجربة الطهي', 'جلسة تصوير', 'ورشة صناعية', 'تجربة الغطس', 'جولة تاريخية'],
  entertainment: ['عرض كوميدي', 'ليلة ألعاب', 'مسابقات ترفيهية', 'عرض سحر', 'ليلة كاريوكي'],
  theatrical: ['مسرحية كوميدية', 'عرض درامي', 'مسرحية أطفال', 'عرض راقص', 'مسرحية موسيقية'],
  entry: ['دخول المعرض', 'دخول المتحف', 'جولة القصر', 'زيارة الحديقة', 'دخول المعرض الفني'],
  shop: ['سوق الحرف', 'معرض التسوق', 'بازار رمضاني', 'سوق المزارعين', 'معرض الأزياء'],
  cinemas: ['فيلم أكشن', 'فيلم كوميدي', 'فيلم درامي', 'عرض خاص', 'ليلة أفلام'],
}

const EVENT_TITLES_EN: Record<string, string[]> = {
  events: ['Contemporary Art Exhibition', 'Family Day', 'Cooking Workshop', 'Entrepreneurship Summit', 'Spring Festival'],
  restaurants: ['Eastern Restaurant', 'Coastal Cafe', 'Live Cooking Restaurant', 'Central Coffee House', 'Garden Restaurant'],
  activity: ['Mountain Climbing', 'Desert Safari', 'Painting Workshop', 'Kayaking Adventure', 'Cultural Tour'],
  concerts: ['Ahmed Al-Mughiri Concert', 'Music Night', 'Live Performance', 'Oud Show', 'Jazz Night'],
  experiences: ['Cooking Experience', 'Photo Session', 'Craft Workshop', 'Diving Experience', 'Historical Tour'],
  entertainment: ['Comedy Show', 'Games Night', 'Entertainment Contest', 'Magic Show', 'Karaoke Night'],
  theatrical: ['Comedy Play', 'Drama Performance', 'Kids Theater', 'Dance Show', 'Musical Play'],
  entry: ['Exhibition Entry', 'Museum Visit', 'Palace Tour', 'Park Visit', 'Art Gallery Entry'],
  shop: ['Crafts Market', 'Shopping Exhibition', 'Ramadan Bazaar', 'Farmers Market', 'Fashion Show'],
  cinemas: ['Action Movie', 'Comedy Film', 'Drama Film', 'Special Screening', 'Movie Night'],
}

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop',
]

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(daysAhead: number): string {
  const d = new Date()
  d.setDate(d.getDate() + randomInt(1, daysAhead))
  d.setHours(randomInt(10, 20), 0, 0, 0)
  return d.toISOString()
}

function generateEvents(): Event[] {
  const events: Event[] = []
  let id = 1

  for (const cat of CATEGORIES) {
    const titlesAr = EVENT_TITLES_AR[cat] || EVENT_TITLES_AR.events
    const titlesEn = EVENT_TITLES_EN[cat] || EVENT_TITLES_EN.events

    for (let i = 0; i < 6; i++) {
      const titleAr = titlesAr[i % titlesAr.length] + ` ${randomInt(1, 5)}`
      const titleEn = titlesEn[i % titlesEn.length] + ` ${randomInt(1, 5)}`
      const images = [random(PLACEHOLDER_IMAGES), random(PLACEHOLDER_IMAGES), random(PLACEHOLDER_IMAGES)]
      events.push({
        id: String(id++),
        title: { ar: titleAr, en: titleEn },
        description: { ar: 'وصف الفعالية الرائع', en: 'Amazing event description' },
        category: cat,
        location: random(LOCATIONS),
        venue: random(VENUES),
        startTime: randomDate(90),
        endTime: randomDate(90),
        price: randomInt(50, 500),
        rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
        soldOut: Math.random() < 0.15,
        images,
      })
    }
  }

  return events
}

export interface Event {
  id: string
  title: { ar: string; en: string }
  description: { ar: string; en: string }
  category: string
  location: string
  venue: string
  startTime: string
  endTime: string
  price: number
  rating: number
  soldOut: boolean
  images: string[]
}

export const events = generateEvents()

export function getCategories() {
  return CATEGORIES.map((slug) => ({
    slug,
    name: { ar: slug, en: slug },
    eventCount: events.filter((e) => e.category === slug).length,
  }))
}
