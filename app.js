Vue.createApp({
    data() {
        return {
            initialDate : new Date(2022,01,17),
            selectedDate : new Date(),
            
            teams : [
                        {
                            teamName: "Sherlock",
                            teamIcon: "bi bi-lightning-charge",
                            numOnCall: 2,
                            onCallPerson: [],
                            oooPerson: [],
                            people: ["Tarun", "Charles", "Harry", "James", "AK", "Amol"]         
                        },
                        {
                            teamName: "Strange",
                            teamIcon: "bi bi-phone-flip",
                            numOnCall: 1,
                            onCallPerson: [],
                            oooPerson: [],
                            people: ["Gary", "Mohan", "Anime"]
                        },
                        {
                            teamName: "Storage",
                            teamIcon: "bi bi-hdd-stack",
                            numOnCall: 1,
                            onCallPerson: [],
                            oooPerson: [],
                            people: ["Sam", "Moore", "Nben"]
                        },
                        {
                            teamName: "Sytems",
                            teamIcon: "bi bi-pc-display",
                            numOnCall: 1,
                            onCallPerson: [],
                            oooPerson: [],
                            people: ["Washington", "Varun"]
                        }
                    ]
        } ;
    },

    methods: {
        updateOnCallPerson() {
            if( this.selectedDate )
            {
                let tempTeams = this.teams

                //selectedDateStr = this.selectedDate.split('-')
                //currDate = new Date( parseInt(selectedDateStr[0]), parseInt(selectedDateStr[1]) , parseInt(selectedDateStr[2]) )

                currDate = new Date( moment(this.selectedDate).format("yyyy-MM-DD"))
                
                for( team in tempTeams)
                {
                    var peopleLen = tempTeams[ team ].people.length
                    
                    var firstOnCall = moment(currDate).week() % peopleLen
                    var secondOnCall = (firstOnCall + ( peopleLen / 2 )) % peopleLen

                    if( tempTeams[ team ].numOnCall == 2 )
                        tempTeams[ team ].onCallPerson= [ tempTeams[ team ].people[ firstOnCall ], tempTeams[ team ].people[ secondOnCall ] ]
                    else
                        tempTeams[ team ].onCallPerson= [ tempTeams[ team ].people[ firstOnCall ] ]
                    
                    // OOO set for Sherlock
                    if( team == 0 )
                    {
                        var leaveIndexFirst = (firstOnCall +1) % peopleLen
                        var leaveIndexSecond = 0

                        if( leaveIndexFirst + (peopleLen/2) < peopleLen )
                            leaveIndexSecond = parseInt(leaveIndexFirst + peopleLen/2 )
                        else
                            leaveIndexSecond = parseInt(leaveIndexFirst - peopleLen/2) 
                        
                        tempTeams[ team ].oooPerson = [ tempTeams[ team ].people[ leaveIndexFirst ], tempTeams[ team ].people[ leaveIndexSecond ] ]
                    }
                }
                this.teams = tempTeams
            }
        }
    },
    mounted() {
       this.updateOnCallPerson()
    },

}).mount("#app") ;
