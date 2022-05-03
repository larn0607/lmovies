import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__divider"></div>
      <div className="footer__content">
        <div className="footer__content__top">
          <Link to="/">Question? Contact us.</Link>
        </div>
          <div className="footer__content__menus">
            <div className="footer__content__menu">
              <Link to="/">FAQ</Link>
              <Link to="/">Investor Relations</Link>
              <Link to="/">Privacy</Link>
              <Link to="/">Speed Test</Link>
            </div>
            <div className="footer__content__menu">
              <Link to="/">Help Center</Link>
              <Link to="/">Jobs</Link>
              <Link to="/">Cookie Preferences</Link>
              <Link to="/">Legal Notices</Link>
            </div>
            <div className="footer__content__menu">
              <Link to="/">Account</Link>
              <Link to="/">Ways to Watch</Link>
              <Link to="/">Corporate Information</Link>
              <Link to="/">Only on Netflix</Link>
            </div>
            <div className="footer__content__menu">
              <Link to="/">Media Center</Link>
              <Link to="/">Terms of Use</Link>
              <Link to="/">Contact Us</Link>
            </div>
          </div>
      </div>
    </footer>
  )
}

export default Footer
