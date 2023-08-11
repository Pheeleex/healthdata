const app = Vue.createApp({
    data() {
        const cachedBloodGroups = localStorage.getItem('bloodGroups');
        const cachedAllPeople = localStorage.getItem('allPeople');
      return {
        bloodGroups: cachedBloodGroups ? JSON.parse(cachedBloodGroups) :  [
            { group: 'A', people: [] },
            { group: 'B', people: [] },
            { group: 'O', people: [] },
            { group: 'AB', people: [] },
        ],
        /******Data for 20 people*****/
        allPeople: cachedAllPeople ? JSON.parse(cachedAllPeople) : [
            { name: 'Alice', age: 18, bloodGroup: 'A' },
            { name: 'Bob', age: 25, bloodGroup: 'O' },
            { name: 'Charlie', age: 32, bloodGroup: 'O' },
            { name: 'David', age: 14, bloodGroup: 'AB' },
            { name: 'Eva', age: 28, bloodGroup: 'A' },
            { name: 'Frank', age: 22, bloodGroup: 'B' },
            { name: 'Grace', age: 31, bloodGroup: 'O' },
            { name: 'Henry', age: 19, bloodGroup: 'AB' },
            { name: 'Isabel', age: 27, bloodGroup: 'A' },
            { name: 'Jack', age: 29, bloodGroup: 'A' },
            { name: 'Kate', age: 17, bloodGroup: 'O' },
            { name: 'Liam', age: 36, bloodGroup: 'AB' },
            { name: 'Mia', age: 16, bloodGroup: 'AB' },
            { name: 'Noah', age: 23, bloodGroup: 'B' },
            { name: 'Olivia', age: 39, bloodGroup: 'B' },
            { name: 'Paul', age: 20, bloodGroup: 'AB' },
            { name: 'Quinn', age: 34, bloodGroup: 'A' },
            { name: 'Ryan', age: 26, bloodGroup: 'B' },
            { name: 'Sophia', age: 30, bloodGroup: 'O' },
            { name: 'Thomas', age: 21, bloodGroup: 'AB' },
        ],
        showChart: true, 
      };
    },
    computed: {
      ageGroups() {
          const ageGroups = {
              '11-20': [],
              '21-30': [],
              '31-40': []
          };

          this.allPeople.forEach(person => {
              const age = person.age;
              if (age >= 11 && age <= 20) {
                  ageGroups['11-20'].push(person);
              } else if (age >= 21 && age <= 30) {
                  ageGroups['21-30'].push(person);
              } else if (age >= 31 && age <= 40) {
                  ageGroups['31-40'].push(person);
              }
          });

          return ageGroups;
      }
  },
    methods: {
      /******filter data into groups******/
        generateRandomPeople() {
          this.bloodGroups.forEach((group) => {
            group.people = this.allPeople.filter(person => person.bloodGroup === group.group);
          });
        },
        /******toggle Button******/
        toggleChartVisibility() {
            this.showChart = !this.showChart;
        },
        /*******HighCharts********/
        renderHighcharts() {
          const bloodGroupCategories = this.bloodGroups.map(group => group.group);
          const ageGroupCategories = ['11-20', '21-30', '31-40'];
      
          const seriesData = [];
          ageGroupCategories.forEach(ageGroup => {
              const data = this.bloodGroups.map(group => {
                  const peopleInAgeGroup = group.people.filter(person => {
                      const age = person.age;
                      if (ageGroup === '11-20') return age >= 11 && age <= 20;
                      if (ageGroup === '21-30') return age >= 21 && age <= 30;
                      if (ageGroup === '31-40') return age >= 31 && age <= 40;
                  });
                  return peopleInAgeGroup.length;
              });
              seriesData.push({
                  name: ageGroup,
                  data: data
              });
          });
      
          Highcharts.chart('bar-chart', {
              chart: {
                  type: 'bar'
              },
              title: {
                  text: 'Blood Group and Age Group Distribution'
              },
              xAxis: {
                  categories: bloodGroupCategories
              },
              yAxis: {
                  title: {
                      text: 'Number of People'
                  }
              },
              legend: {
                  reversed: true
              },
              plotOptions: {
                  series: {
                      stacking: 'normal'
                  }
                  
              },
              series: seriesData
          });
      },
    },
      
      
    mounted() {
        this.generateRandomPeople();
        this.renderHighcharts();

        // Store data in localStorage
    localStorage.setItem('bloodGroups', JSON.stringify(this.bloodGroups));
    localStorage.setItem('allPeople', JSON.stringify(this.allPeople));
    },
});
  