import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAuth } from "/public/ctx/FirebaseAuth"
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslation } from "react-i18next"

const navigation = [
  { key: 'header.home', path: '/' },
  { key: 'header.apartments', path: '/apartments' },
  { key: 'header.gallery', path: '/gallery' },
]

export default function Header() {
  const { t } = useTranslation()
  const { user, isAuthenticated } = useAuth()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // swipe animation state
  const touchStartX = useRef(0)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const SWIPE_CLOSE_THRESHOLD = 100 // px

  // prevent background scroll
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto"
  }, [mobileMenuOpen])

  // swipe handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    setIsDragging(true)
  }

  const onTouchMove = (e) => {
    if (!isDragging) return

    const currentX = e.touches[0].clientX
    const diff = currentX - touchStartX.current

    // drawer is on RIGHT → allow swipe RIGHT only
    if (diff > 0) {
      setDragX(diff)
    }
  }

  const onTouchEnd = () => {
    setIsDragging(false)

    if (dragX > SWIPE_CLOSE_THRESHOLD) {
      setMobileMenuOpen(false)
    }

    setDragX(0)
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="navbar">
        <div className="flex lg:flex-1">
          <Link to="/" className="navbar-logo">
            <span className="sr-only">GuestHouse Heaven</span>
            <img
              alt=""
              src="https://res.cloudinary.com/dbleq6bwe/image/upload/v1767396248/prhouse_iqxjut.png"
            />
          </Link>
        </div>

        {/* Phone menu button */}
        {!mobileMenuOpen && (
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="menu-button"
            >
              <Bars3Icon className="size-6" />
            </button>
          </div>
        )}

        {/* Desktop nav */}
        <div className={`desktop-nav ${user ? "flex-grow-11" : "flex-grow-2"}`}>
          {navigation.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className="btn-orange"
              style={({ isActive }) =>
                isActive ? { color: 'black' } : {}
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </div>

        {/* Auth */}
        <div className="auth-buttons">
          <LanguageSwitcher />
          {isAuthenticated ? (
            <Link to="/logout" className="btn-orange">
              {t("header.logout")}
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn-orange">
                {t("header.login")}
              </Link>
              <Link to="/register" className="btn-orange">
                {t("header.register")}
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        {/* Drawer */}
        <div
          className="fixed inset-y-0 right-0 w-1/2 max-w-sm bg-white/90 shadow-xl flex flex-col"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            transform: `translateX(${dragX}px)`,
            transition: isDragging ? "none" : "transform 0.25s ease-out",
          }}
        >
          {/* Header (fixed) */}
          <div className="p-6 flex items-center justify-between border-b">
            {/* Language switcher */}
                <LanguageSwitcher />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mobile-nav space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}

              {isAuthenticated ? (
                <Link
                  to="/logout"
                  className="logout-button"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("header.logout")}
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("header.login")}
                  </Link>
                  <Link
                    to="/register"
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("header.register")}
                  </Link>
                </>
              )}

              {/* Footer links (mobile only) */}
              <div className="mt-8 border-t pt-4 space-y-3">
                <Link
                  to="/privacyPolicy"
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("footer.privacy")}
                </Link>
                <Link
                  to="/termsOfService"
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("footer.terms")}
                </Link>
                <Link
                  to="/contacts"
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("footer.contacts")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  )
}
