import React, { Component } from 'react';
import { FaSpinner, FaRandom } from 'react-icons/fa';
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueFilter,
  IssueFilterItem,
  IssueList,
  IssueLabel,
  Pagination,
} from './styles';

class Repository extends Component {
  state = {
    repoName: '',
    repository: {},
    issues: [],
    loading: true,
    page: 1,
    perPage: 5,
    filter: 'all',
    searching: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filter, perPage, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);
    this.setState({ repoName });

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: perPage,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async e => {
    if (e.target.value) {
      const { filter: oldFilter, perPage, repoName } = this.state;
      const filter = e.target.value;

      if (filter === oldFilter) return;

      this.setState({ filter, page: 1 });

      const issues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: perPage,
          page: 1,
        },
      });

      this.setState({
        issues: issues.data,
      });
    }
  };

  handlePagination = async (element, page) => {
    if (element.target.disabled) return;

    const { repoName, filter, perPage } = this.state;

    this.setState({ searching: true });
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: perPage,
        page,
      },
    });

    this.setState({ issues: issues.data, page, searching: false });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filter,
      page,
      perPage,
      searching,
    } = this.state;

    if (loading) {
      return (
        <Loading>
          Carregando <FaSpinner color="#FFF" size={30} />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueFilter>
          <IssueFilterItem
            color="#53C1DE"
            value="all"
            filter={filter === 'all' ? 'true' : undefined}
            onClick={this.handleFilter}
          >
            <FaRandom size={20} />
            Todas
          </IssueFilterItem>

          <IssueFilterItem
            color="#49B963"
            value="open"
            filter={filter === 'open' ? 'true' : undefined}
            onClick={this.handleFilter}
          >
            <GoIssueOpened size={22} />
            Abertas
          </IssueFilterItem>

          <IssueFilterItem
            color="#D34242"
            value="closed"
            filter={filter === 'closed' ? 'true' : undefined}
            onClick={this.handleFilter}
          >
            <GoIssueClosed size={22} />
            Fechadas
          </IssueFilterItem>
        </IssueFilter>

        <IssueList length={issues.length}>
          {issues.map((issue, index) => (
            <li key={String(issue.id)} index={index}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a target="blank" href={issue.html_url}>
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <IssueLabel
                      color={`#${label.color}`}
                      key={String(label.id)}
                    >
                      {label.name}
                    </IssueLabel>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Pagination>
          <button
            disabled={(page <= 1 || searching) && true}
            type="button"
            onClick={e => this.handlePagination(e, page - 1)}
          >
            Anterior
          </button>

          <span>{searching ? <FaSpinner /> : `Pagina ${page}`}</span>

          <button
            disabled={(issues.length < perPage || searching) && true}
            type="button"
            onClick={e => this.handlePagination(e, page + 1)}
          >
            Pŕoxima
          </button>
        </Pagination>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
