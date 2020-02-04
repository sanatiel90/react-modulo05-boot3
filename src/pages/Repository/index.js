import React, { Component } from 'react'
import api from './../../services/api'
import PropTypes from 'prop-types'
import Container from './../../components/Container'
import { Loading, Owner, IssuesList, FilterContainer, PagesContainer, NextButton, PrevButton } from './styles'
import { Link } from 'react-router-dom'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

export default class Repository extends Component {
    state = {
        repository: {},
        issues: [],
        loading: true,
        activeFilter: 1,
        page: 1,
        filters: [
            { index: 1, type: 'all', title: 'Todas' },
            { index: 2, type: 'open', title: 'Abertas' },
            { index: 3, type: 'closed', title: 'Fechadas' },
        ]
    }

    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            })
        }).isRequired,
    }

    async componentDidMount() {
        const { match } = this.props
        const repoName = decodeURIComponent(match.params.repository)

        //forma de realizar varias requisicoes ao mesmo tempo; o retorno de Promise.all é um array cujas posicoes indicam cada
        //uma das requisicoes feitas; a requisicao em issues tbm conta com um objeto params para configs adicionais, q serao implementadas 
        //na url como query params
        const [repositories, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'all',
                    per_page: 5,
                    page: 1
                }
            })
        ])


        this.setState({
            repository: repositories.data,
            issues: issues.data,
            loading: false
        })
    }

    handleFilter = async filterIndex => {

        const { filters, repository, activeFilter } = this.state

        if (activeFilter === filterIndex) {
            return
        }

        const filter = filters.find(f => f.index === filterIndex)

        const issues = await api.get(`/repos/${repository.full_name}/issues`, {
            params: {
                state: filter.type,
                per_page: 5
            }
        })

        this.setState({
            issues: issues.data,
            activeFilter: filterIndex
        })

    }

    prevPage = async () => {
        const { page, repository, activeFilter, filters } = this.state

        const filter = filters.find(f => f.index === activeFilter)

        let newPage = page - 1;

        if (newPage === 0) newPage = 1

        const issues = await api.get(`/repos/${repository.full_name}/issues`, {
            params: {
                state: filter.type,
                per_page: 5,
                page: newPage
            }
        })

        this.setState({
            issues: issues.data,
            page: newPage
        })
    }

    nextPage = async () => {
        const { page, repository, activeFilter, filters } = this.state

        const filter = filters.find(f => f.index === activeFilter)

        const newPage = page + 1;

        const issues = await api.get(`/repos/${repository.full_name}/issues`, {
            params: {
                state: filter.type,
                per_page: 5,
                page: newPage
            }
        })

        this.setState({
            issues: issues.data,
            page: newPage
        })
    }

    render() {
        const { repository, issues, loading, filters, page } = this.state

        if (loading) {
            return <Loading>Carregando...</Loading>
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssuesList>
                    <FilterContainer>
                        {filters.map(filter => (
                            <button
                                key={filter.index}
                                type="button"
                                onClick={() => { this.handleFilter(filter.index) }}>
                                {filter.title}
                            </button>
                        ))}
                    </FilterContainer>

                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}> {label.name} </span>
                                    ))}
                                </strong>

                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssuesList>
                <PagesContainer>
                    <PrevButton type="button" onClick={this.prevPage} page={page === 1} > <FaAngleLeft color="#fff" size={12} /> </PrevButton>
                    <NextButton type="button" onClick={this.nextPage} > <FaAngleRight color="#fff" size={12} /> </NextButton>
                </PagesContainer>
            </Container>
        )
    }
}

