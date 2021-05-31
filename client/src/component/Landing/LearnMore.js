// Node modules
import React, { Component } from "react";

// Components
import Navbar from "../Navbar/Navigation";
import NavbarAdmin from "../Navbar/NavigationAdmin";

//Contracts
import getWeb3 from "../../getWeb3";
import Election from "../../contracts/Election.json";

// CSS
import "./Landing.css";

// const buttonRef = React.createRef();
export default class LearnMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ElectionInstance: undefined,
          account: null,
          web3: null,
          isAdmin: false,
          candidateCount: undefined,
          candidates: [],
          isElStarted: false,
          isElEnded: false,
        };
      }

      componentDidMount = async () => {
        // refreshing once
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
    
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = Election.networks[networkId];
          const instance = new web3.eth.Contract(
            Election.abi,
            deployedNetwork && deployedNetwork.address
          );
    
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, ElectionInstance: instance, account: accounts[0] });
    
          // Get total number of candidates
          const candidateCount = await this.state.ElectionInstance.methods
            .getTotalCandidate()
            .call();
          this.setState({ candidateCount: candidateCount });
    
          // Get start and end values
          const start = await this.state.ElectionInstance.methods.getStart().call();
          this.setState({ isElStarted: start });
          const end = await this.state.ElectionInstance.methods.getEnd().call();
          this.setState({ isElEnded: end });
    
          // Loadin Candidates detials
          for (let i = 1; i <= this.state.candidateCount; i++) {
            const candidate = await this.state.ElectionInstance.methods
              .candidateDetails(i - 1)
              .call();
            this.state.candidates.push({
              id: candidate.candidateId,
              header: candidate.header,
              slogan: candidate.slogan,
              voteCount: candidate.voteCount,
            });
          }
    
          this.setState({ candidates: this.state.candidates });
    
          // Admin account and verification
          const admin = await this.state.ElectionInstance.methods.getAdmin().call();
          if (this.state.account === admin) {
            this.setState({ isAdmin: true });
          }
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.error(error);
        }
    };
    
      render() {
        if (!this.state.web3) {
          return (
            <>
              {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
              <center>Loading Web3, accounts, and contract...</center>
            </>
          );
        }

    
        return (
            <>
                {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
                <br /> <br />
                <div classNameName="container align-middle">

                  <div className="row">

                    <div className="col-lg-8">

                      <h2 className="headingLearn">How does BlockVote works?</h2>

                      <br/>
                      <hr className="horBreak" style={{width: '50%'}}/>

                      <img className="img-fluid" src="https://www.aljazeera.com/wp-content/uploads/2021/04/AP_21096261246310.jpg?resize=1200%2C630"
                        alt="Voters standing in a queue to cast vote"/>

                      <hr className="horBreak" style={{width: '51%'}}/>

                      <br/>

                      <div className="containerLearnMore" >
                        <p className="lead">Standing in the queue and waiting for your turn to cast vote is a part of a history now. </p>
                        <br/>
                        <p className="content1">We proposes a new system of voting where everything is transparent and there is no question
                          of tampering, the voting machine as it doesn't exists in first place.</p>
                        <br/>
                        <p className="content1">BlockVote is the upcoming way of casting vote where all the votes will be stored in the Blockchain, which
                          makes the system tamper proof and completely transparent.</p>
                      </div>

                      <br/>
                      <div className="containerLearn2 general" role="alert">
                        <span>BlockVote is still under development and various trials! Please expect a few bugs.</span>
                      </div>
                      <br/>

                      <div className="containerLearnMore" >
                        <p className="lead2" >How to use?</p>

                        <p className="content1">1. Install MetaMask Browser Extension.</p>
                        <p className="content1">2. Make sure that the Ethereum Account which you've been assigned is imported into &emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp; MetaMask.</p>
                        <p className="content1">3. Explore election section and cast your vote!</p>
                        <p style={{marginTop: "10px"}} className="content1">Regards
                        </p>
                      </div>
                      <br/>
                    </div>
                  </div>
                </div>    
            </>
        );
    }
}
