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

const FIXED_EVENTS_CONTENT: Omit<Event, 'id' | 'images'>[] = [
  {
    title: { ar: 'BLVD Forest', en: 'BLVD Forest' },
    description: {
      ar: 'يعود BLVD Forest بحيوانات نادرة في أجواء أفريقية جديدة. استمتع بتجارب تفاعلية مع الحياة البرية! (لجميع الأعمار)',
      en: 'BLVD Forest returns with rare exotic animals in a new African-inspired setting. Enjoy interactive wildlife experiences! (For all Ages)',
    },
    category: 'experiences',
    location: 'BLVD WORLD',
    venue: 'BLVD WORLD',
    startTime: '2025-11-10T16:00:00.000Z',
    endTime: '2026-02-28T23:55:00.000Z',
    price: 150,
    rating: 5,
    soldOut: false,
  },
  {
    title: { ar: 'غرفة الهروب: سر الفرعون', en: 'Escape Room: Secret of the Pharaoh' },
    description: {
      ar: 'أبواب غامضة وألغاز قديمة وكنوز ضائعة بانتظار من يجرؤ على الدخول... مساران فقط: أحدهما للنجاة والآخر للمجهول. أي مصير ستختار؟',
      en: 'Mysterious doors, ancient puzzles, and lost treasures await those who dare to enter... Only two paths: one leads to survival, the other to the unknown. Which fate will you choose?',
    },
    category: 'experiences',
    location: 'BLVD WORLD',
    venue: 'BLVD WORLD',
    startTime: '2025-11-10T16:00:00.000Z',
    endTime: '2026-01-31T23:55:00.000Z',
    price: 200,
    rating: 5,
    soldOut: false,
  },
  {
    title: { ar: 'ZAMA ZULU', en: 'ZAMA ZULU' },
    description: {
      ar: 'استعد لاستشعار إيقاع الزولو! يعود زاما زولو بنكهات جنوب أفريقية وآسيوية حارة وإيقاعات حية وأجواء ستبقيك ترقص على الطاولة.',
      en: 'Get ready to feel the Zulu beat! Zama Zulu returns with sizzling South African and South Asian flavors, live rhythms, and an ambiance that will keep you dancing at your table.',
    },
    category: 'restaurants',
    location: 'The Groves',
    venue: 'ZAMA ZULU',
    startTime: '2026-01-12T16:00:00.000Z',
    endTime: '2026-02-07T00:00:00.000Z',
    price: 180,
    rating: 5,
    soldOut: false,
  },
  {
    title: { ar: 'مدرسة التزلج', en: 'Ski School' },
    description: {
      ar: 'اكتشف دروس تزلج احترافية في مدرسة التزلج في كورشفيل، مناسبة لجميع المستويات ومغامرة رائعة للعائلة بأكملها.',
      en: 'Discover expert skiing lessons at the ski school in Courchevel, perfect for all levels and a great adventure for the whole family.',
    },
    category: 'activity',
    location: 'BLVD WORLD',
    venue: 'BLVD WORLD',
    startTime: '2025-11-30T16:00:00.000Z',
    endTime: '2026-02-28T00:00:00.000Z',
    price: 250,
    rating: 5,
    soldOut: false,
  },
  {
    title: { ar: 'الزمانكان', en: 'ALZAMAKAN' },
    description: {
      ar: 'مسرحية سعودية عن طلاب ومعلمهم يستخدمون آلة زمن للكشف عن أسرار التاريخ، ليجدوا أنفسهم منقولين إلى عصور مختلفة.',
      en: "A Saudi play about students and their teacher using a time machine to uncover history's secrets, only to be unexpectedly transported to different eras.",
    },
    category: 'theatrical',
    location: 'RUH BLVD CITY',
    venue: 'RUH BLVD CITY',
    startTime: '2025-12-01T16:00:00.000Z',
    endTime: '2026-03-01T23:00:00.000Z',
    price: 120,
    rating: 5,
    soldOut: true,
  },
]

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

  // استبدال محتوى أول 5 فعاليات بالمحتوى من الصور (مع الإبقاء على الصور دون تغيير)
  for (let i = 0; i < FIXED_EVENTS_CONTENT.length && i < events.length; i++) {
    const fixed = FIXED_EVENTS_CONTENT[i]
    events[i] = {
      ...events[i],
      ...fixed,
      id: events[i].id,
      images: events[i].images,
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
