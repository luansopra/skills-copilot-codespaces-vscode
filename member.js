function skillsMember() {
    var skills = {
        name: 'John',
        age: 32,
        skills: ['HTML', 'CSS', 'JS'],
        getSkills: function () {
            return this.skills;
        }
    };
    return skills;
}