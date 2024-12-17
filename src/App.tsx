import React from "react"
import Header from "./components/Header/Header";
import SectionCart from "./components/Section/SectionCart";
import {Route, Routes} from "react-router-dom";
import SectionCard from "./components/Section/SectionCard";
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";
import FullPizza from "./components/Section/Card/FullPizza";



function App() {
  return (
    <div className="wrapper">
        <Provider store={store}>
            <Header/>
            <Routes>
                <Route path={"/"} element={<SectionCard/>}/>
                <Route path={"/cart"} element={<SectionCart/>}/>
                <Route path={"/pizza/:id"} element={<FullPizza/>}/>
            </Routes>
        </Provider>
    </div>
  );
}

export default App;
