import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import styles from "./Dashboard.module.scss";
import ArrowBtn from "../../components/UI/icons/ArrowBtn";
import Logo from "../../components/UI/icons/Logo";
import GrayyTringleIcon from "../../components/UI/icons/GrayyTrangleIcon";
import MenuBurgerIcon from "../../components/UI/icons/MenuBurgerIcon";
import LinePhone from "../../components/UI/icons/LinePhone";
import DashbordLogoIcon from "../../components/UI/icons/DashbordLogoIcon";
import AddQuestion from "../../components/UI/icons/AddQuestion";
import PlusIcon from "../../components/UI/icons/Create/PlusIcon";
import {http} from "../../http/http";

const Dashboard = (props) => {
  const [typeTab, setTypeTab] = useState('all');
  const [arrAsker, setArrAsker] = useState([1, 2, 3, 4, 5, 6, 7])
  let navigate = useNavigate();
  const cardRef = useRef(null);
  const [userProfile, setUserProfile] = useState('');




  useEffect(async () => {

    if (cardRef?.current?.classList.contains("start-rotate")) {
      cardRef?.current?.classList.remove("start-rotate")
    }

    const timer = setTimeout(() => {
      cardRef?.current?.classList.add("start-rotate")
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  const createAsker = () => {
    navigate('/create-asker')
  }

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (user) {
      setUserProfile(user);
    }
  }, []);

  const handleLink = (e, item) => {
    e.preventDefault();
    navigate(
      "/view-asker",
      {state: {
        asker_id: item.asker_id,
        user_id: localStorage.getItem("UserID"),
      }
    })
  }

  const handleTabChange = (e, type) => {
    e.preventDefault();
    setTypeTab(type)
  }

  useEffect(() => {
    if (typeTab === 'active') {
      http.post('activeAsker', `user_id=${localStorage.getItem("UserID")}`)
        .then(resp => resp.data)
        .then(askersData => setArrAsker(askersData.asker))
    } else if (typeTab === 'inactive') {
      http.post('archivedAsker', `user_id=${localStorage.getItem("UserID")}`).then(resp => resp.data).then(askersData => setArrAsker(askersData.asker))
    } else if (typeTab === 'all') {
      http.post('allAsker', `user_id=${localStorage.getItem("UserID")}`).then(resp => resp.data).then(askersData => setArrAsker(askersData.asker))
    }

  }, [typeTab])

  // const removeEffect = () => {
  //   elRef.current?.classList.add("ease-out-effect")
  //   const timer = setTimeout(() => {
  //     navigate('/share-asker')
  //   }, 300);
  //   return timer;
  // };


  return (
    <div ref={cardRef} className={`default-flip flip-card-inner  ${styles.createContainer}`}>
      <div className={styles.bgContainer}>
        <div className={styles.contantWrap}>
          <div className={styles.topBox}>
            <GrayyTringleIcon className={styles.grayBg}/>
            <div className={styles.menuWBox}>
              <NavLink to={'/'}><Logo className={styles.logo}/></NavLink>
              <button type='button' className={styles.burgerBtn}>
                <MenuBurgerIcon className={styles.burgerIcon}/>
              </button>
            </div>
            <div className={styles.headBox}>
              <button type='button' className={`${styles.tabBox} ${styles.tabLeft} ${typeTab === 'all' ? styles.active : ''}`} onClick={(event) => handleTabChange(event, 'all')}>
                All
              </button>
              <button type='button' className={`${styles.tabBox} ${typeTab === 'active' ? styles.active : ''}`} onClick={(event) => handleTabChange(event, 'active')}>
                ACTIVE
              </button>
              <button type='button' className={`${styles.tabBox} ${styles.tabright} ${typeTab === 'inactive' ? styles.active : ''}`} onClick={(event) => handleTabChange(event, 'inactive')}>
                INACTIVE
              </button>
            </div>

            <div className={styles.row}>
              <div className={styles.rowAnswers}>
                {arrAsker &&
                  arrAsker?.map((item, index) => {
                    return <div key={index} className={styles.cardWrap}>
                      <div className={styles.answersContainer}>
                        <DashbordLogoIcon className={styles.createLogo}/>
                        <div className={` ${styles.questionBlock}`}>
                          <div className={styles.textBox}>
                            <div className={styles.title}>{item.title}</div>
                            <div className={styles.text}>{item.author}</div>
                          </div>
                        </div>
                        <div className={`${styles.buttonBox}`}>
                          <button type="submit" className={`continue-btn ${styles.buttonItem}`} onClick={(e) => handleLink(e, item)}>
                            <span>12 NEW ANSWERS</span>
                            <div className={styles.plusIconBox}>
                              <ArrowBtn className={`${styles.shareIcon}`}/>
                            </div>
                          </button>
                        </div>

                      </div>
                    </div>
                  })
                }
                <div className={styles.cardWrap}>
                  <button type='button' className={styles.addAskerBtn}>
                    <PlusIcon className={styles.plusIcon}/>
                  </button>
                </div>
              </div>


            </div>
          </div>

          <div className={`${styles.buttonBox}`}>
            <button type="submit" className={`continue-btn  ${styles.buttonStyle}`} onClick={createAsker}>
              <span className={styles.buttonStyleText}>CREATE ASKER</span>
              <AddQuestion className={styles.arrowBtn}/>
            </button>
            <LinePhone className={styles.linePhone}/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
