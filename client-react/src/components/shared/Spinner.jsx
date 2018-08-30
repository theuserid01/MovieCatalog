import React from 'react'

import './Spinner.css'

const Spinner = () => {
    const header = document.getElementsByTagName('header')[0]

    if (!header) {
        return <h1 className="text-center">Loading...</h1>
    }

    const headerHeight = getAbsoluteHeight(header)
    const spinnerHeight = document.body.offsetHeight - headerHeight
    return (
        <section className="section-spinner" style={{ "height": spinnerHeight }}>
            <div className="dbl-spinner"></div>
            <div className="dbl-spinner"></div>
        </section>
    )
}

export default Spinner

function getAbsoluteHeight(el) {
    el = (typeof el === 'string') ? document.querySelector(el) : el

    const styles = window.getComputedStyle(el)
    const marginBottom = parseFloat(styles['marginBottom'])
    const marginTop = parseFloat(styles['marginTop'])
    const margin = marginBottom + marginTop

    return Math.ceil(el.offsetHeight + margin)
}
