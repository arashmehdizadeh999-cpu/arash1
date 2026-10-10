import { processSteps } from '../data/site'
import { useReveal } from '../components/useReveal'

export default function OurProcess() {
  const { ref, visible } = useReveal()
  return (
    <section className="process-section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">فرآیند کار</span>
          <h2 className="section-title">از ایده تا اجرا</h2>
        </div>
        <div className={`process-timeline reveal ${visible ? 'visible' : ''}`}>
          {processSteps.map((step, i) => (
            <div key={i} className="process-step">
              <div className="step-num">{step.num}</div>
              <div className="step-line" />
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
