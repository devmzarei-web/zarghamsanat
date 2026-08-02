import { Shield, Award, Users, Clock, ThumbsUp } from 'lucide-react'
import styles from './FeaturesBar.module.css'

const FEATURES = [
  {
    icon: Shield,
    title: 'ایمنی در اولویت',
    desc: 'اجرای پروژه‌ها بر اساس استانداردهای HSE',
  },
  {
    icon: Award,
    title: 'کیفیت برتر',
    desc: 'استفاده از مزیل با کیفیت و تجهیزات پیشرفته',
  },
  {
    icon: Users,
    title: 'تیم متخصص',
    desc: 'بهره‌گیری از نیروهای متخصص در صنعت',
  },
  {
    icon: Clock,
    title: 'تعهد به زمان',
    desc: 'تحویل پروژه‌ها در زمان با برنامه‌ریزی دقیق',
  },
  {
    icon: ThumbsUp,
    title: 'رضایت کارفرما',
    desc: 'جلب رضایت کارفرمایان اولویت اصلی ماست',
  },
]

export default function FeaturesBar() {
  return (
    <section className={styles.bar} aria-label="ویژگی‌های ما">
      <div className="container">
        <ul className={styles.list}>
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon
            return (
              <li key={i} className={styles.item}>
                <div className={styles.iconWrap}>
                  <Icon size={28} aria-hidden="true" />
                </div>
                <div className={styles.text}>
                  <h3 className={styles.title}>{feat.title}</h3>
                  <p className={styles.desc}>{feat.desc}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
