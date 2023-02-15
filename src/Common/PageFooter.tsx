import React from 'react'
import { useSelector } from 'react-redux'
import { Default } from '../ReactResponsive/Responsive'
import { RootState } from '../Store'

export default function PageFooter() {
  
  const theme = useSelector((state:RootState) => state.mallState.theme)

  return (
    <footer style={{backgroundColor: theme ? '#F6F5F0' : '#555'}}>
    <div className="inner">
      <Default>
        <ul className="menu">
          <li className='green'>Get to Know Us</li>
          <li>Make Money with Us</li>
          <li>Amazon Payment Products</li>
          <li>Let Us Help you</li>
        </ul>
      </Default>

      <li className="btn-group">
        <button className={theme ? "btn btn--brown" : "btn btn--reverse"}>Conditions of Use</button>
        <button className={theme ? "btn btn--brown" : "btn btn--reverse"}>Privacy Notice</button>
        <button className={theme ? "btn btn--brown" : "btn btn--reverse"}>Ads Privacy Choices</button>
      </li>

      <p className="info">
        <span>Made by</span>
        <span>Kody</span>
        <span>ZeroBase</span>
        <span>Front-end School</span>
      </p>

      <div className="copyright">
        &copy; 1996-2023, Amazon.com, Inc. or its affiliates
      </div>
    </div>
  </footer>
  )
}