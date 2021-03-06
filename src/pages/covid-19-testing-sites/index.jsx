/* eslint-disable react/no-unused-state */
// this is the main page

import React from 'react';
import axios from 'axios';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../../components/seo';
import Layout from '../../components/TestingSites/layout';

import Hero from '../../components/TestingSites/hero';
import CallToActionConsumers from '../../components/TestingSites/callToActionConsumers';
import CallToActionDevs from '../../components/TestingSites/callToActionDevs';
import State from '../../components/TestingSites/state';


class IndexPageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      california: [],
      washington: [],
      massachusetts: [],
      'new-york': [],
    };
  }

  componentDidMount() {
    const { usState } = this.props;

    usState.map((node) => {
      if (node.node.context && node.node.context.state !== null) {
        // eslint-disable-next-line prefer-const
        let { state } = node.node.context;

        axios.get(` https://covid-19-testing.github.io/locations/${state}/complete.json`).then((response) => {
          this.setState({ data: response.data });

          if (state === 'california') {
            this.setState({ california: response.data });
          }
          if (state === 'washington') {
            this.setState({ washington: response.data });
          }
          if (state === 'new-york') {
            this.setState({ 'new-york': response.data });
          }
          if (state === 'massachusetts') {
            this.setState({ massachusetts: response.data });
          }
        });
      }
      return this.state;
    });
  }

  render() {
    return (
      <Layout>
        <SEO title="List of APIs and Blueprints" />
        <div className="">
          <Hero />
          <State state={this.state} />
          <div className="youmayalsolike">
            <div className="container-fluid ts-section">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <CallToActionConsumers />
                  </div>
                  <div className="col-sm-6">
                    <CallToActionDevs />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const IndexPage = () => {
  const usState = useStaticQuery(graphql`
  {
    allSitePage {
      edges {
        node {
          context {
            state
          }
        }
      }
    }
  }`);
  return (
    <>
      <IndexPageComponent usState={usState.allSitePage.edges} />
    </>
  );
};

export default IndexPage;
