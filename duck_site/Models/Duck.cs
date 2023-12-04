namespace Duck_IT.Models
{
    public class Duck
    {
        public string id = "";
        public string duckName = "";
        public string ownerEmail = "";
        public int strength = 1;
        public int perception = 1;
        public int endurance = 1;
        public int charisma = 1;
        public int intelligence = 1;
        public int agility = 1;
        public int luck = 1;

        public Dictionary<string, string> GetValues()
        {
            return new()
            {
                { "id", id },
                { "duckName", duckName },
                { "ownerEmail", ownerEmail },
                { "strength", strength.ToString() },
                { "perception", perception.ToString()},
                { "endurance", endurance.ToString() },
                { "charisma", charisma.ToString() },
                { "intelligence", intelligence.ToString() },
                { "agility", agility.ToString() },
                { "luck", luck.ToString() }
            };
        }
    }
}
