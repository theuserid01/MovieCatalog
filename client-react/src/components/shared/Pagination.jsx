import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

const Pagination = (props) => {
    const p = props.pagination
    const li = []
    for (let i = 1; i <= p.totalPages; i++) {
        let isActive = i === p.currentPage
        li.push(
            <li key={i} className={isActive ? 'page-item active' : 'page-item'}>
                <Link to={'/users/all?page=' + i + p.querySearch} className="page-link">{i}</Link>
            </li>
        )
    }
    return (
        <div className="col-12">
            <ul className="pagination">
                <li className={p.hasPrevPage ? 'page-item' : 'page-item disabled'}>
                    <Link to={'/users/all?page=' + p.prevPage + p.querySearch} className="page-link">Previous</Link>
                </li>
                {li}
                <li className={p.hasNextPage ? 'page-item' : 'page-item disabled'}>
                    <Link to={'/users/all?page=' + p.nextPage + p.querySearch} className="page-link">Next</Link>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Pagination)
