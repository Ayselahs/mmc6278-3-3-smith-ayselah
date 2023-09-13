const { expect } = require("chai");
const request = require("supertest");
const nock = require("nock");
const fs = require("fs").promises;
const app = require("./app");

// https://developers.teleport.org/api/getting_started/#life_quality_ua
// https://api.teleport.org/api/cities/?search=orlando&embed=city:search-results/city:item/city:urban_area/ua:scores
const CITY_INFO = {
  _embedded: {
    "city:search-results": [
      {
        _embedded: {
          "city:item": {
            _embedded: {
              "city:urban_area": {
                _embedded: {
                  "ua:scores": {
                    _links: {
                      self: {
                        href:
                          "https://api.teleport.org/api/urban_areas/slug:orlando/scores/",
                      },
                    },
                    categories: [
                      {
                        color: "#f3c32c",
                        name: "Housing",
                        score_out_of_10: 5.778499999999999,
                      },
                      {
                        color: "#f3d630",
                        name: "Cost of Living",
                        score_out_of_10: 5.284,
                      },
                      {
                        color: "#f4eb33",
                        name: "Startups",
                        score_out_of_10: 6.5975,
                      },
                      {
                        color: "#d2ed31",
                        name: "Venture Capital",
                        score_out_of_10: 2.464,
                      },
                      {
                        color: "#7adc29",
                        name: "Travel Connectivity",
                        score_out_of_10: 3.7734999999999994,
                      },
                      {
                        color: "#36cc24",
                        name: "Commute",
                        score_out_of_10: 4.33875,
                      },
                      {
                        color: "#19ad51",
                        name: "Business Freedom",
                        score_out_of_10: 8.671,
                      },
                      {
                        color: "#0d6999",
                        name: "Safety",
                        score_out_of_10: 4.134,
                      },
                      {
                        color: "#051fa5",
                        name: "Healthcare",
                        score_out_of_10: 8.274,
                      },
                      {
                        color: "#150e78",
                        name: "Education",
                        score_out_of_10: 3.6245,
                      },
                      {
                        color: "#3d14a4",
                        name: "Environmental Quality",
                        score_out_of_10: 6.676,
                      },
                      {
                        color: "#5c14a1",
                        name: "Economy",
                        score_out_of_10: 6.5145,
                      },
                      {
                        color: "#88149f",
                        name: "Taxation",
                        score_out_of_10: 4.772,
                      },
                      {
                        color: "#b9117d",
                        name: "Internet Access",
                        score_out_of_10: 4.886,
                      },
                      {
                        color: "#d10d54",
                        name: "Leisure & Culture",
                        score_out_of_10: 5.9295,
                      },
                      {
                        color: "#e70c26",
                        name: "Tolerance",
                        score_out_of_10: 5.784000000000002,
                      },
                      {
                        color: "#f1351b",
                        name: "Outdoors",
                        score_out_of_10: 4.492999999999999,
                      },
                    ],
                    summary:
                      "<p>Orlando, Florida, is among the top cities with a <b>free business environment</b>.\n\n    \n        Our data reflects that this city has a good ranking in <b>healthcare</b> and <b>environmental quality</b>.\n    \n\n    \n</p>\n\n\n    <p>Orlando is one of the top ten city matches for 0.5% of Teleport users.</p>\n",
                    teleport_city_score: 55.471891891891914,
                  },
                },
                _links: {
                  self: {
                    href:
                      "https://api.teleport.org/api/urban_areas/slug:orlando/",
                  },
                  "ua:admin1-divisions": [
                    {
                      href:
                        "https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/geonames:FL/",
                      name: "Florida",
                    },
                  ],
                  "ua:cities": {
                    href:
                      "https://api.teleport.org/api/urban_areas/slug:orlando/cities/",
                  },
                  "ua:continent": {
                    href:
                      "https://api.teleport.org/api/continents/geonames:NA/",
                    name: "North America",
                  },
                  "ua:countries": [
                    {
                      href:
                        "https://api.teleport.org/api/countries/iso_alpha2:US/",
                      name: "United States",
                    },
                  ],
                  "ua:details": {
                    href:
                      "https://api.teleport.org/api/urban_areas/slug:orlando/details/",
                  },
                  "ua:identifying-city": {
                    href:
                      "https://api.teleport.org/api/cities/geonameid:4167147/",
                    name: "Orlando",
                  },
                  "ua:images": {
                    href:
                      "https://api.teleport.org/api/urban_areas/slug:orlando/images/",
                  },
                  "ua:primary-cities": [
                    {
                      href:
                        "https://api.teleport.org/api/cities/geonameid:4167147/",
                      name: "Orlando",
                    },
                  ],
                  "ua:salaries": {
                    href:
                      "https://api.teleport.org/api/urban_areas/slug:orlando/salaries/",
                  },
                  "ua:scores": {
                    href:
                      "https://api.teleport.org/api/urban_areas/slug:orlando/scores/",
                  },
                },
                bounding_box: {
                  latlon: {
                    east: -80.8786,
                    north: 28.888,
                    south: 28.2076,
                    west: -81.7905,
                  },
                },
                continent: "North America",
                full_name: "Orlando, Florida",
                is_government_partner: false,
                mayor: "Buddy Dyer",
                name: "Orlando",
                slug: "orlando",
                teleport_city_url: "https://teleport.org/cities/orlando/",
                ua_id: "djn4k",
              },
            },
            _links: {
              "city:admin1_division": {
                href:
                  "https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/geonames:FL/",
                name: "Florida",
              },
              "city:alternate-names": {
                href:
                  "https://api.teleport.org/api/cities/geonameid:4167147/alternate_names/",
              },
              "city:country": {
                href: "https://api.teleport.org/api/countries/iso_alpha2:US/",
                name: "United States",
              },
              "city:timezone": {
                href:
                  "https://api.teleport.org/api/timezones/iana:America%2FNew_York/",
                name: "America/New_York",
              },
              "city:urban_area": {
                href: "https://api.teleport.org/api/urban_areas/slug:orlando/",
                name: "Orlando",
              },
              self: {
                href: "https://api.teleport.org/api/cities/geonameid:4167147/",
              },
            },
            full_name: "Orlando, Florida, United States",
            geoname_id: 4167147,
            location: {
              geohash: "djn4k5jryk0t1ut9hpur",
              latlon: {
                latitude: 28.53834,
                longitude: -81.37924,
              },
            },
            name: "Orlando",
            population: 270934,
          },
        },
        _links: {
          "city:item": {
            href: "https://api.teleport.org/api/cities/geonameid:4167147/",
          },
        },
        matching_alternate_names: [
          {
            name: "orlando",
          },
          {
            name: "Orlando",
          },
          {
            name: "Orlando i Florida",
          },
        ],
        matching_full_name: "Orlando, Florida, United States",
      },
    ],
  },
  _links: {
    curies: [
      {
        href:
          "https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/",
        name: "location",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/City/#!/relations/{rel}/",
        name: "city",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/",
        name: "ua",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/",
        name: "country",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/",
        name: "a1",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/",
        name: "tz",
        templated: true,
      },
    ],
    self: {
      href: "https://api.teleport.org/api/cities/?search=orlando&geohash=",
    },
  },
  count: 1,
};
// https://api.teleport.org/api/cities/?search=ocala&embed=city:search-results/city:item/city:urban_area/ua:scores
const CITY_NO_INFO = {
  _embedded: {
    "city:search-results": [
      {
        _embedded: {
          "city:item": {
            _links: {
              "city:admin1_division": {
                href:
                  "https://api.teleport.org/api/countries/iso_alpha2:US/admin1_divisions/geonames:FL/",
                name: "Florida",
              },
              "city:alternate-names": {
                href:
                  "https://api.teleport.org/api/cities/geonameid:4166673/alternate_names/",
              },
              "city:country": {
                href: "https://api.teleport.org/api/countries/iso_alpha2:US/",
                name: "United States",
              },
              "city:timezone": {
                href:
                  "https://api.teleport.org/api/timezones/iana:America%2FNew_York/",
                name: "America/New_York",
              },
              self: {
                href: "https://api.teleport.org/api/cities/geonameid:4166673/",
              },
            },
            full_name: "Ocala, Florida, United States",
            geoname_id: 4166673,
            location: {
              geohash: "djjw4c77v0mtvcbg3wgg",
              latlon: {
                latitude: 29.1872,
                longitude: -82.14009,
              },
            },
            name: "Ocala",
            population: 58218,
          },
        },
        _links: {
          "city:item": {
            href: "https://api.teleport.org/api/cities/geonameid:4166673/",
          },
        },
        matching_alternate_names: [
          {
            name: "Ocala",
          },
        ],
        matching_full_name: "Ocala, Florida, United States",
      },
    ],
  },
  _links: {
    curies: [
      {
        href:
          "https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/",
        name: "location",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/City/#!/relations/{rel}/",
        name: "city",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/",
        name: "ua",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/",
        name: "country",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/",
        name: "a1",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/",
        name: "tz",
        templated: true,
      },
    ],
    self: {
      href: "https://api.teleport.org/api/cities/?search=ocala&geohash=",
    },
  },
  count: 1,
};
// https://api.teleport.org/api/cities/?search=sdfsdf&embed=city:search-results/city:item/city:urban_area/ua:scores
const CITY_NOT_FOUND = {
  _embedded: {
    "city:search-results": [],
  },
  _links: {
    curies: [
      {
        href:
          "https://developers.teleport.org/api/resources/Location/#!/relations/{rel}/",
        name: "location",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/City/#!/relations/{rel}/",
        name: "city",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/UrbanArea/#!/relations/{rel}/",
        name: "ua",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/Country/#!/relations/{rel}/",
        name: "country",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/Admin1Division/#!/relations/{rel}/",
        name: "a1",
        templated: true,
      },
      {
        href:
          "https://developers.teleport.org/api/resources/Timezone/#!/relations/{rel}/",
        name: "tz",
        templated: true,
      },
    ],
    self: {
      href: "https://api.teleport.org/api/cities/?search=asdasd&geohash=",
    },
  },
  count: 0,
};

// https://findwork.dev/api/jobs/?location=miami
const JOB_RESULTS = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 113485,
      role: "Multiple Engineering Roles",
      company_name: "Defy Trends",
      company_num_employees: null,
      employment_type: null,
      location: "Miami",
      remote: true,
      logo: null,
      url:
        "https://findwork.dev/113485/multiple-engineering-roles-at-defy-trends",
      text:
        "Defy Trends is an AI and data-driven crypto intelligence for investors, traders, researchers, crypto newbies and crypto vets to obtain quality information and actionable insights to make confident crypto investment decisions.<br>We are looking for talented people throughout the entire stack: JavaScript, React, Node, Python, Go, Elixir, Solar, Flink, k8s, and much more. Our hiring efforts focus on Europe and Eastern US.<br>- Senior DevOps&#x2F;Platform Engineer<br>- Senior Data Engineer<br>- Senior Distributed System Engineer<br>- Senior Software Engineer (Python, Go, Elixir)<br>- Senior FullStack Engineer (Python, Django)<br>- Senior FrontEnd Engineer (React)<br>- Blockchain Developer<br>- Data Scientist &#x2F; Blockchain Analyst<br>Feel free to drop me a mail: sebastian at defytrends.tech",
      date_posted: "2022-04-01T20:36:00Z",
      keywords: [
        "node",
        "elixir",
        "python",
        "flink",
        "django",
        "blockchain",
        "k8s",
        "react",
        "javascript",
      ],
      source: "Hn",
    },
  ],
};
// https://findwork.dev/api/jobs/?location=orlando
const JOBS_NOT_FOUND = { count: 0, next: null, previous: null, results: [] };

describe("Job Location API", () => {
  before(() => {
    nock.disableNetConnect()
    nock.enableNetConnect('127.0.0.1')
  })
  after(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })
  describe("Statically serves front-end files", () => {
    it('should statically serve index.html on "/"', async () => {
      const html = await fs.readFile("./public/index.html", "UTF-8");
      const response = await request(app)
        .get("/")
        .expect("content-type", /html/g)
        .expect(200);
      expect(response.text).to.eq(html);
    });
    it('should statically serve index.js on "/index.js"', async () => {
      const script = await fs.readFile("./public/index.js", "UTF-8");
      const response = await request(app)
        .get("/index.js")
        .expect("content-type", /javascript/g)
        .expect(200);
      expect(response.text).to.eq(script);
    });
    it('should statically serve style.css on "/style.css"', async () => {
      const styles = await fs.readFile("./public/style.css", "UTF-8");
      const response = await request(app)
        .get("/style.css")
        .expect("content-type", /css/g)
        .expect(200);
      expect(response.text).to.eq(styles);
    });
  });
  describe("GET /api/city/:city", () => {
    describe("Jobs and City found", () => {
      beforeEach(() => {
        nock("https://api.teleport.org")
          .get("/api/cities/")
          .query({
            embed: "city:search-results/city:item/city:urban_area/ua:scores",
            search: "anycity",
          })
          .reply(200, CITY_INFO);
        nock("https://findwork.dev")
          .get("/api/jobs/")
          .query({ location: "anycity" })
          .reply(200, JOB_RESULTS);
      });
      it('should return 200 status and "jobs" and "cityInfo" properties in JSON response object', async () => {
        const response = await request(app)
          .get("/api/city/anycity")
          .expect(200)
          .expect("Content-Type", /json/);
        const { jobs, cityInfo } = response.body;
        expect(jobs).to.exist;
        expect(cityInfo).to.exist;
      });

      it('should return 200 status and job results as under "jobs" property in JSON response object', async () => {
        const response = await request(app)
          .get("/api/city/anycity")
          .expect(200)
          .expect("Content-Type", /json/);
        const { jobs } = response.body;
        expect(jobs).to.exist;
        expect(jobs).to.deep.eq(JOB_RESULTS.results);
      });
      it('should return 200 status and city info as under "cityInfo" property in JSON response object', async () => {
        const response = await request(app)
          .get("/api/city/anycity")
          .expect(200)
          .expect("Content-Type", /json/);
        const { cityInfo } = response.body;
        expect(cityInfo).to.exist;
        expect(cityInfo).to.deep.eq(
          CITY_INFO._embedded["city:search-results"][0]._embedded["city:item"]
            ._embedded["city:urban_area"]._embedded["ua:scores"]
        );
      });
    });
    describe("Jobs found but no city info found", () => {
      beforeEach(() => {
        nock("https://api.teleport.org")
          .get("/api/cities/")
          .query({
            embed: "city:search-results/city:item/city:urban_area/ua:scores",
            search: "anycity",
          })
          .reply(200, CITY_NO_INFO);
        nock("https://findwork.dev")
          .get("/api/jobs/")
          .query({ location: "anycity" })
          .reply(200, JOB_RESULTS);
      });
      it('should return 200 status and "jobs" and "cityInfo" properties in JSON response object', async () => {
        const response = await request(app)
          .get("/api/city/anycity")
          .expect(200)
          .expect("Content-Type", /json/);
        const { jobs, cityInfo } = response.body;
        expect(jobs).to.exist;
        expect(cityInfo).to.exist;
      });

      it('should return 200 status and job results as under "jobs" property in JSON response object', async () => {
        const response = await request(app)
          .get("/api/city/anycity")
          .expect(200)
          .expect("Content-Type", /json/);
        const { jobs } = response.body;
        expect(jobs).to.exist;
        expect(jobs).to.deep.eq(JOB_RESULTS.results);
      });
      it('should return 200 status and false for "cityInfo" property in JSON response object', async () => {
        const response = await request(app)
          .get("/api/city/anycity")
          .expect(200)
          .expect("Content-Type", /json/);
        const { cityInfo } = response.body;
        expect(cityInfo).to.exist;
        expect(cityInfo).to.eq(false);
      });
    });
    describe("City info found but no jobs found", () => {
      beforeEach(() => {
        nock("https://api.teleport.org")
          .get("/api/cities/")
          .query({
            embed: "city:search-results/city:item/city:urban_area/ua:scores",
            search: "anycity",
          })
          .reply(200, CITY_INFO);
        nock("https://findwork.dev")
          .get("/api/jobs/")
          .query({ location: "anycity" })
          .reply(200, JOBS_NOT_FOUND);
      });
      it('should return 200 status and "jobs" and "cityInfo" properties in JSON response object', async () => {
        const response = await request(app)
          .get("/api/city/anycity")
          .expect(200)
          .expect("Content-Type", /json/);
        const { jobs, cityInfo } = response.body;
        expect(jobs).to.exist;
        expect(cityInfo).to.exist;
      });

      it('should return 200 status and false for "jobs" property in JSON response object', async () => {
        const response = await request(app)
          .get("/api/city/anycity")
          .expect(200)
          .expect("Content-Type", /json/);
        const { jobs } = response.body;
        expect(jobs).to.exist;
        expect(jobs).to.eq(false);
      });
      it('should return 200 status and city info in "cityInfo" property in JSON response object', async () => {
        const response = await request(app)
          .get("/api/city/anycity")
          .expect(200)
          .expect("Content-Type", /json/);
        const { cityInfo } = response.body;
        expect(cityInfo).to.exist;
        expect(cityInfo).to.deep.eq(
          CITY_INFO._embedded["city:search-results"][0]._embedded["city:item"]
            ._embedded["city:urban_area"]._embedded["ua:scores"]
        );
      });
    });
    describe("No Jobs or City info found", () => {
      beforeEach(() => {
        nock("https://api.teleport.org")
          .get("/api/cities/")
          .query({
            embed: "city:search-results/city:item/city:urban_area/ua:scores",
            search: "anycity",
          })
          .reply(200, CITY_NOT_FOUND);
        nock("https://findwork.dev")
          .get("/api/jobs/")
          .query({ location: "anycity" })
          .reply(200, JOBS_NOT_FOUND);
      });
      it("should return a 404 status code and JSON response", async () => {
        await request(app)
          .get("/api/city/anycity")
          .expect(404)
          .expect("Content-Type", /json/);
      });

      it('should return "error" property in JSON response object', async () => {
        const response = await request(app)
          .get("/api/city/anycity")
          .expect(404)
          .expect("Content-Type", /json/);
        const { jobs, cityInfo, error } = response.body;
        expect(jobs).to.not.exist;
        expect(cityInfo).to.not.exist;
        expect(error).to.exist;
      });
    });
    describe("External API non-200 responses", () => {
      for (const code of [401, 403, 404, 500]) {
        it(`should return a 404 status and JSON response of {error: "some message"} if both APIs return ${code}`, async () => {
          nock("https://api.teleport.org")
            .get("/api/cities/")
            .query(true)
            .reply(code, CITY_INFO);
          nock("https://findwork.dev")
            .get("/api/jobs/")
            .query(true)
            .reply(code, JOB_RESULTS);
          const response = await request(app)
            .get("/api/city/anycity")
            .expect(404)
            .expect("Content-Type", /json/);
          const { jobs, cityInfo, error } = response.body;
          expect(jobs).to.not.exist;
          expect(cityInfo).to.not.exist;
          expect(error).to.exist;
        });
        it(`should return a 200 status and JSON response of {cityInfo: <city info>, jobs: false} if jobs API returns ${code}`, async () => {
          nock("https://api.teleport.org")
            .get("/api/cities/")
            .query(true)
            .reply(200, CITY_INFO);
          nock("https://findwork.dev")
            .get("/api/jobs/")
            .query(true)
            .reply(code, JOB_RESULTS);
          const response = await request(app)
            .get("/api/city/anycity")
            .expect(200)
            .expect("Content-Type", /json/);
          const { jobs, cityInfo, error } = response.body;
          expect(jobs).to.exist;
          expect(jobs).to.eq(false);
          expect(cityInfo).to.exist;
          expect(cityInfo).to.not.eq(false);
          expect(error).to.not.exist;
        });
        it(`should return a 200 status and JSON response of {cityInfo: false, jobs: <job info>} if city info API returns ${code}`, async () => {
          nock("https://api.teleport.org")
            .get("/api/cities/")
            .query(true)
            .reply(code, CITY_INFO);
          nock("https://findwork.dev")
            .get("/api/jobs/")
            .query(true)
            .reply(200, JOB_RESULTS);
          const response = await request(app)
            .get("/api/city/anycity")
            .expect(200)
            .expect("Content-Type", /json/);
          const { jobs, cityInfo, error } = response.body;
          expect(jobs).to.exist;
          expect(jobs).to.not.eq(false);
          expect(cityInfo).to.exist;
          expect(cityInfo).to.eq(false);
          expect(error).to.not.exist;
        });
      }
    });
  });
});
