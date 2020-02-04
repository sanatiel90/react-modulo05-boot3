import React, { Component } from 'react'
import { Form, SubmitButton, List, ClearButton } from './styles'
import Container from './../../components/Container'

import { FaGithubAlt, FaPlus, FaSpinner, FaUndoAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import api from './../../services/api'
import { Exception } from 'handlebars'

export default class Main extends Component {

    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: false
    }

    componentDidMount() {
        const repositories = localStorage.getItem('repositories')

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) })
        }
    }


    componentDidUpdate(_, prevState) {
        const { repositories } = this.state
        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories))
        }
    }



    handleChangeValue = e => {
        this.setState({ newRepo: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault()

        try {

            this.setState({ loading: true, error: false })

            const { newRepo, repositories } = this.state

            if (newRepo === '') throw new Error('Informe um repositório')

            /* minha forma :S
            repositories.forEach(repo => {
                if (repo.name === newRepo) {
                    throw new Error('Repositório duplicado')
                }
            })*/

            const isDuplicate = repositories.find(r => (r.name === newRepo))
            if (isDuplicate) throw new Error('Repositório duplicado')

            const response = await api.get(`/repos/${newRepo}`)

            const data = {
                name: response.data.full_name
            }

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false,
                error: false
            })

        } catch (err) {
            this.setState({ error: true })
        } finally {
            this.setState({ loading: false })
        }

    }

    handleClear = e => {
        e.preventDefault()

        localStorage.clear()

        this.setState({
            repositories: []
        })
    }

    render() {
        const { newRepo, repositories, loading, error } = this.state
        return (
            <Container >
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit} error={error}>
                    <input
                        type="text"
                        placeholder="Adicionar usuário"
                        onChange={this.handleChangeValue}
                        value={newRepo}
                    />

                    <SubmitButton loading={loading} >
                        {loading ? <FaSpinner color="#fff" size={14} /> : <FaPlus color="#fff" size={14} />}
                    </SubmitButton>

                    <ClearButton onClick={this.handleClear}>
                        <FaUndoAlt color="#fff" size={14} />
                    </ClearButton>
                </Form>

                <List >
                    {repositories.map(repo => (
                        <li key={repo.name}>
                            <span>{repo.name}</span>
                            <Link to={`/repository/${encodeURIComponent(repo.name)}`} >Detalhes</Link>
                        </li>
                    ))}
                </List>

            </Container>
        )
    }
}
