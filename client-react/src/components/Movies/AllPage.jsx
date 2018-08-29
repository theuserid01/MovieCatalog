import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import withLoading from '../../helpers/withLoading'
import moviesService from '../../services/movies-service'

class AllPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
              filter: '',
            movies: [],
            movieDetails: {},
            movieDetailsId: ''
        }
    }

    componentDidMount() {
        const movieDetails = this.props.data.movieDetails
        const movieDetailsId = this.props.data.movieDetails._id
        this.setState({
            movieDetails: movieDetails,
            movieDetailsId: movieDetailsId
        })
        this.props.history.push('/movies/all/' + movieDetailsId)
    }

    async getMovieDetails(id) {
        try {
            const res = await moviesService.detailsGet(id)

            if (!res.success) {
                console.log(res.message)
                return
            }

            this.setState({
                movieDetails: res.data.movieDetails,
                movieDetailsId: res.data.movieDetails._id
            })
            this.props.history.push('/movies/all/' + id)
        } catch (err) {
            console.log(err)
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onClickArticle = (id) => {
        if (this.state.movieDetailsId === id) {
            return
        }

        this.getMovieDetails(id)
    }

    render() {
        const md = this.state.movieDetails
        return (
            <div className="d-flex">
                <section className="section-left">
                    <div className="div-input">
                        <input
                            onChange={this.onChangeHandler}
                            type="text"
                            name="filter"
                            placeholder="Search by Genre OR Title"
                        />
                    </div>
                    <div className="div-thumbs">
                        {this.props.data.movies
                            .filter(m =>
                                m.genres.toLowerCase().includes(this.state.filter.toLowerCase()) ||
                                m.title.toLowerCase().includes(this.state.filter.toLowerCase()))
                            .map(m => {
                                return (
                                    <article key={m._id} onClick={this.onClickArticle.bind(this, m._id)}>
                                        <img src={m.imageUrl} alt="movie" />
                                        <h6>{m.title} ({m.productionYear})</h6>
                                        <p>{m.genres && m.genres}</p>
                                    </article>
                                )
                            })
                        }
                    </div>
                </section>
                <section className="section-right">
                    <h4>{md.title} ({md.productionYear})</h4>
                    <article className="article-info">
                        <div className="div-poster">
                            <img src={md.imageUrl} alt="movie" />
                        </div>
                        <div className="div-info">
                            <div className="tbl-row">
                                <h6>Genre</h6>
                                <p>{md.genres ? md.genres : 'None'}</p>
                            </div>
                            <div className="tbl-row">
                                <h6>Countries</h6>
                                <p>{md.countries ? md.countries : 'None'}</p>
                            </div>
                            <div className="tbl-row">
                                <h6>Languages</h6>
                                <p>{md.languages ? md.languages : 'None'}</p>
                            </div>
                            <div className="tbl-row">
                                <h6>Color</h6>
                                <p>(// TODO)</p>
                            </div>
                            <div className="tbl-row">
                                <h6>Budget</h6>
                                <p>(// TODO)</p>
                            </div>
                            <div className="tbl-row">
                                <h6>Gross</h6>
                                <p>(// TODO)</p>
                            </div>
                            <div className="tbl-row">
                                <h6>IMDb Rating</h6>
                                <p>(// TODO)</p>
                            </div>
                            <div className="tbl-row">
                                <h6>Rotten Tomatoes Score</h6>
                                <p>(// TODO)</p>
                            </div>
                            <div className="tbl-row">
                                <h6>Main Festivals</h6>
                                <p>(// TODO)</p>
                            </div>
                            <div className="tbl-row">
                                <h6>Release</h6>
                                <p>(// TODO)</p>
                            </div>
                        </div>
                    </article>
                    <article className="article-creq">
                        <h5>Crew</h5>
                        <p>(// TODO)</p>
                    </article>
                    <article className="article-synopsis">
                        <h5>Cast</h5>
                        <p>(// TODO)</p>
                    </article>
                    <article className="article-synopsis">
                        <h5>Synopsis</h5>
                        <p>{md.synopsis ? md.synopsis : 'None'}</p>
                    </article>
                    {this.props.isAuthenticated && (
                        <div className="btn-group d-flex">
                            <Link to={'/movies/edit/' + md._id} className="btn btn-warning w-100" role="button">Edit</Link>
                            {this.props.isAdmin && (
                                <Link to={'/movies/delete/' + md._id} className="btn btn-danger w-100" role="button">Delete</Link>
                            )}
                        </div>
                    )}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.users.signIn.isAdmin,
        isAuthenticated: state.users.signIn.isAuthenticated
    }
}

const request = () => moviesService.allGet()
export default connect(mapStateToProps, null)(withRouter(withLoading(AllPage, request, { id: false })))
