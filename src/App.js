import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home,Header,SignIn,AboutPage, Footer ,Register,Contact, Profile, NotFound, UserTablePage, AssociationPage, UpdateAssociation, User, UpdateUser, Save, TransactionTable, Withdraw, AddShare, ShareTable, LoanApplicationForm, LoanDetails, LoanPaymentForm, LoanPaymentDetails} from "./compontents/compontent";
import TransferShare from "./compontents/TransferShare";

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Header />

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="/add-association" element={<AssociationPage/>}/>
          <Route path="/users" element={<UserTablePage/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/user-view/:userId" element={<User/>} />
          <Route path="/update-association/:id" element={<UpdateAssociation/>} />
          <Route path="/careers" element={<h1>careers</h1>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/users/save/:userId" element={<Save />} />
          <Route path="/users/view-saving/:userId" element={<TransactionTable/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/user/:id" element={<UpdateUser/>} />
          <Route path="/users/save-withdaraw/:userId" element={<Withdraw/>}/>
          <Route path="/users/buy-share/:userId" element={<AddShare/>} />
          <Route path="/users/apply-loan/:userId" element={<LoanApplicationForm/>} />
          <Route path="/users/view-loans/:userId" element={<LoanDetails/>} />
          <Route path="/users/view-share/:userId" element={<ShareTable/>} />
          <Route path="/loan-payment/:userId/:loanId" element={<LoanPaymentForm/>} />
          <Route path="/payment-view/:userId/:loanId" element={<LoanPaymentDetails/>} />
          <Route path="/users/share-transfer/:userId" element={<TransferShare/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
