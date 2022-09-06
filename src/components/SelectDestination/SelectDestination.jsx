import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import CountryData from '../../CountruData.json'
import './SelectDestination.css'
import $ from 'jquery'
import { IoIosArrowBack } from 'react-icons/io'

function SelectDestination({ Closer }) {
  const closeSelect = () => {
    Closer(false)
  }
  const [countries, setCountries] = useState(CountryData)
  const [inputValueCheck, setInputValueCheck] = useState(false)
  const [searchedArray, setSearchedArray] = useState(CountryData);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (searchString.length === 0) {
      setSearchedArray(CountryData)
    } else {
      const searchedObjects = []
      CountryData.forEach((singleCountryObject, index) => {
        Object.values(singleCountryObject).every((onlyValues, valIndex) => {
          if (onlyValues.toLowerCase().includes(searchString.toLowerCase())) {
            searchedObjects.push(singleCountryObject)
            return;
          }
        })
      })
      setSearchedArray(searchedObjects)
    }
  }, [searchString])

  const checkValueInput = (e) => {
    //this line for develop
    setSearchString(e.target.value)
    //this line for develop
    if (e.target.value !== "") {
      setInputValueCheck(true)
      $(".input-bottom-txt").css({ "display": "none" })
      $(".origin-list-box").css({ "display": "block" })
      $(".box-selectOrigin").css({ "height": "100vh" })
    } else {
      $(".input-bottom-txt").css({ "display": "block" })
      $(".origin-list-box").css({ "display": "none" })
      $(".box-selectOrigin").css({ "height": "40vh" })
    }

  }

  const selectDestination = () => {

  }

  return (
    <div className='SelectOrigin-Container'>
      <section onClick={closeSelect} style={{ color: "#ffffff" }} className='empty-div'>
      </section>
      <div className="box-selectOrigin">
        <div className="selectOriginDivs">
          <div className='header-sOrigin'>
            <div onClick={closeSelect} style={{width : "32px" , height : "32px"}}>
              <IoIosArrowBack color='#FFFFFF' fontSize={'24px'}  />
            </div>
            <span style={{ position: "absolute", left: "0", right: "0" }} className='title-txts'>Destination</span>
            <span></span>
          </div>
          <span className='ch-txts'>Pleasse select your city.</span>
          <div className="OriginCity">
            <label>Destination city</label>
            <input className='origin-input' value={searchString} onChange={checkValueInput} />
            <span className='input-bottom-txt'>Enter your city name Please</span>
            <div className="origin-list-box">
              {
                searchedArray.map((item, index) => {
                  return (
                    <div className='OriginsItem' onClick={selectDestination} key={index}>
                      <Icon style={{ color: "#B770FE", marginRight: "10px", fontSize: "24px" }} icon="cil:location-pin" />
                      <span className='origins-country'>{item.country},</span>
                      <span className='origins-capital'>{item.city}</span>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <button style={{ position: "absolute", bottom: "0", width: "90vw" }} className='Continue-btn' disabled>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default SelectDestination