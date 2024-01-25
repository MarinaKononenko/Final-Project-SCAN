import axios from "axios";
import { BASE_URL, GENERAL_DATA_URL, DATA_URL, DATA_DETAILS_URL } from "../utils/constants.js";

async function makeRequest(url, data) {
  try {
    const response = await axios.post(`${BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}`, error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
}

async function getGeneralData(searchParameters) {
  const data = {
    issueDateInterval: {
      startDate: `${searchParameters.startDate}`,
      endDate: `${searchParameters.endDate}`
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: `${searchParameters.inn}`,
            maxFullness: true,
            inBusinessNews: null
          }
        ],
        onlyMainRole: `${searchParameters.mainRole}`,
        tonality: `${searchParameters.tonality}`,
        onlyWithRiskFactors: `${searchParameters.riskFactors}`,
        riskFactors: {
          and: [],
          or: [],
          not: []
        },
        themes: {
          and: [],
          or: [],
          not: []
        }
      },
      themesFilter: {
        and: [],
        or: [],
        not: []
      }
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: []
    },
    attributeFilters: {
      excludeTechNews: `${searchParameters.technicalNews}`,
      excludeAnnouncements: `${searchParameters.announcements}`,
      excludeDigests: `${searchParameters.newsDigests}`
    },
    similarMode: "duplicates",
    limit: `${searchParameters.documentCount}`,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: [
      "totalDocuments",
      "riskFactors"
    ]
  };

  return await makeRequest(GENERAL_DATA_URL, data);
}

async function getData(searchParameters) {
  const data = {
    issueDateInterval: {
      startDate: `${searchParameters.startDate}`,
      endDate: `${searchParameters.endDate}`
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: `${searchParameters.inn}`,
            maxFullness: true,
            inBusinessNews: null
          }
        ],
        onlyMainRole: `${searchParameters.mainRole}`,
        tonality: `${searchParameters.tonality}`,
        onlyWithRiskFactors: `${searchParameters.riskFactors}`,
        riskFactors: {
          and: [],
          or: [],
          not: []
        },
        themes: {
          and: [],
          or: [],
          not: []
        }
      },
      themesFilter: {
        and: [],
        or: [],
        not: []
      }
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: []
    },
    attributeFilters: {
      excludeTechNews: `${searchParameters.technicalNews}`,
      excludeAnnouncements: `${searchParameters.announcements}`,
      excludeDigests: `${searchParameters.newsDigests}`
    },
    similarMode: "duplicates",
    limit: `${searchParameters.documentCount}`,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: [
      "totalDocuments",
      "riskFactors"
    ]
  };

  return await makeRequest(DATA_URL, data);
}

async function getDetailData(arrForRequest) {
  const data = {
    ids: arrForRequest
  };

  return await makeRequest(DATA_DETAILS_URL, data);
}

export { getGeneralData, getData, getDetailData };
