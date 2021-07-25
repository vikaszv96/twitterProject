import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const SendEmail = () => {
  return (
    <div class="container-scroller">
      <Navbar />
      <div class="container-fluid page-body-wrapper">
        <Sidebar />
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Share Sentiments Data</h2>
                <div class="row">
                  <div class="col-12">
                    <div class="table-responsive">
                      <table id="order-listing" class="table">
                        <thead>
                          <tr>
                            <th>Sr. No.</th>
                            <th>Analysis Date</th>
                            <th>Tweet Title</th>
                            <th>No. of Tweets</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>2012/08/03</td>
                            <td>Edinburgh</td>
                            <td>New York</td>
                            <td>
                              <a href="/Tweets">
                                <button class="btn btn-outline-primary">
                                  Send Email
                                </button>
                              </a>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>2015/04/01</td>
                            <td>Doe</td>
                            <td>Brazil</td>
                            <td>
                              <button class="btn btn-outline-primary">
                                Send Email
                              </button>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>2010/11/21</td>
                            <td>Sam</td>
                            <td>Tokyo</td>
                            <td>
                              <button class="btn btn-outline-primary">
                                Send Email
                              </button>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>2016/01/12</td>
                            <td>Sam</td>
                            <td>Tokyo</td>
                            <td>
                              <button class="btn btn-outline-primary">
                                Send Email
                              </button>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>2017/12/28</td>
                            <td>Sam</td>
                            <td>Tokyo</td>
                            <td>
                              <button class="btn btn-outline-primary">
                                Send Email
                              </button>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>2000/10/30</td>
                            <td>Sam</td>
                            <td>Tokyo</td>
                            <td>
                              <button class="btn btn-outline-primary">
                                Send Email
                              </button>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>2011/03/11</td>
                            <td>Cris</td>
                            <td>Tokyo</td>
                            <td>
                              <button class="btn btn-outline-primary">
                                Send Email
                              </button>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>2015/06/25</td>
                            <td>Tim</td>
                            <td>Italy</td>
                            <td>
                              <button class="btn btn-outline-primary">
                                Send Email
                              </button>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>2016/11/12</td>
                            <td>John</td>
                            <td>Tokyo</td>
                            <td>
                              <button class="btn btn-outline-primary">
                                Send Email
                              </button>{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>2003/12/26</td>
                            <td>Tom</td>
                            <td>Germany</td>
                            <td>
                              <button class="btn btn-outline-primary">
                                Send Email
                              </button>{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
