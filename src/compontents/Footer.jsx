import { Link } from "react-router-dom";
const Footer = () => {
    const year = new Date().getFullYear()
    return (
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <p className="mt-4 max-w-xs text-white">
                Kira Division Women Entreprenuers sacco Ltd formally found by women as a mission to eradicate poverty among women in kira division
              </p>
              <ul className="mt-8 flex gap-6">
                <li>
                  <Link
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-white transition hover:opacity-75"
                  >
                    <span className="sr-only">Facebook</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-white transition hover:opacity-75"
                  >
                    <span className="sr-only">Instagram</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-white transition hover:opacity-75"
                  >
                    <span className="sr-only">Twitter</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-white transition hover:opacity-75"
                  >
                    <span className="sr-only">GitHub</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    rel="noreferrer"
                    target="_blank"
                    className="text-white transition hover:opacity-75"
                  >
                    <span className="sr-only">Dribbble</span>
                  </Link>
                </li>
              </ul>
            </div>
  
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
              <div>
                <p className="font-medium text-white">Services</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">Fixed Saving</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">Asset Financing</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">Loan Credits</Link>
                  </li>
                
                </ul>
              </div>
  
              <div>
                <p className="font-medium text-white">Company</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">About</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">Meet the Team</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">Accounts Review</Link>
                  </li>
                </ul>
              </div>
  
              <div>
                <p className="font-medium text-white">Helpful Links</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">Contact</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">Live Chat</Link>
                  </li>
                </ul>
              </div>
  
              <div>
                <p className="font-medium text-white">Legal</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">Accessibility</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">Returns Policy</Link>
                  </li>
                  <li>
                    <Link to="/" className="text-white transition hover:opacity-75">Refund Policy</Link>
                  </li>
                 
                </ul>
              </div>
            </div>
          </div>
          <p className="text-xs text-white">&copy; {year} KD-Finance. All rights reserved.</p>
        </div>
      </footer>
    );
  }
    
export default Footer;
