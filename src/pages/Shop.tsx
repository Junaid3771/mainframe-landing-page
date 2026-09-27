import { useState } from 'react'
import { products } from '../data'
import { EMAIL } from '../config'
import { PageIntro, Mark, Arrow } from '../components'

export default function Shop({
  cart,
  setCart,
}: {
  cart: string[]
  setCart: (v: string[]) => void
}) {
  const [filter, setFilter] = useState('All objects')
  return (
    <>
      <PageIntro
        eyebrow="THE MAINFRAME OBJECT SHOP"
        title={
          <>
            Good ideas.
            <br />
            <em>Off the screen.</em>
          </>
        }
        description="A small collection for curious minds. Studio objects, experimental prints, and things with a little extra character."
      />
      <section className="section page-content">
        <div className="shop-notice">
          <span>PREVIEW COLLECTION</span>
          <p>
            These are product concepts. Save your favourites and email an
            availability enquiry. No payment is collected.
          </p>
        </div>
        <div className="filter-bar">
          {['All objects', 'Prints', 'Objects'].map((f) => (
            <button
              key={f}
              className={`pill ${filter === f ? 'active' : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {products
            .filter((p) => filter === 'All objects' || p.category === filter)
            .map((p) => (
              <article className="product-card" key={p.id}>
                <div
                  className={`product-art product-${p.id}`}
                  aria-hidden="true"
                >
                  <div className="physical-object">
                    {p.id === 'print' ? (
                      <span>
                        STAY
                        <br />
                        <em>OPEN.</em>
                        <Mark />
                        <small>MAINFRAME / EDITION 001</small>
                      </span>
                    ) : p.id === 'tote' ? (
                      <span>
                        FULL OF
                        <br />
                        GOOD
                        <br />
                        <em>IDEAS.</em>
                        <small>MAINFRAME®</small>
                      </span>
                    ) : (
                      <span>
                        <Mark />
                        <small>
                          THINK IN
                          <br />
                          ANOTHER
                          <br />
                          DIRECTION.
                        </small>
                      </span>
                    )}
                  </div>
                </div>
                <div className="product-details">
                  <h3>{p.name}</h3>
                  <span>{p.category}</span>
                </div>
                <p>{p.description}</p>
                <button
                  className={`button ${cart.includes(p.id) ? 'button-dark' : 'button-outline'}`}
                  aria-pressed={cart.includes(p.id)}
                  onClick={() =>
                    setCart(
                      cart.includes(p.id)
                        ? cart.filter((id) => id !== p.id)
                        : [...cart, p.id],
                    )
                  }
                >
                  {cart.includes(p.id)
                    ? 'Saved to your selection ✓'
                    : 'Add to selection + '}
                </button>
              </article>
            ))}
        </div>
        <div className="selection-panel" aria-live="polite">
          <div>
            <p className="eyebrow">YOUR SELECTION / {cart.length}</p>
            <h3>
              {cart.length
                ? cart
                    .map((id) => products.find((p) => p.id === id)?.name)
                    .join(', ')
                : 'Something catch your eye?'}
            </h3>
            <p>
              {cart.length
                ? 'Ask about availability, pricing, and future releases by email.'
                : 'Save an object above to start an availability enquiry.'}
            </p>
          </div>
          {cart.length > 0 && (
            <a
              className="button button-dark"
              href={`mailto:${EMAIL}?subject=Shop%20availability%20enquiry&body=${encodeURIComponent(`Hello Mainframe,\n\nI’d love to hear about availability and pricing for:\n${cart.map((id) => `- ${products.find((p) => p.id === id)?.name}`).join('\n')}\n\nThank you!`)}`}
            >
              Enquire by email <Arrow />
            </a>
          )}
        </div>
      </section>
    </>
  )
}
