import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

import SectionContainer from "../components/SectionContainer";
import PageTitle from "../components/PageTitle";

const IndexPage = () => {
  return (
    <main className="pt-6 xl:pb-10 divide-y">
      <Helmet>
        <title>Programs - Varun Dev</title>
        <meta
          name="description"
          content="Collection of programs in various programming languages"
        />
      </Helmet>
      <SectionContainer>
        <div className="py-8">
          <PageTitle>Programs</PageTitle>
        </div>
      </SectionContainer>
      <SectionContainer>
        <div className="my-8">
          <Link
            to="/explore/1"
            className="text-green-600 hover:text-green-700 text-2xl font-bold"
          >
            Explore Programs
          </Link>
        </div>
      </SectionContainer>
    </main>
  );
};

export default IndexPage;
