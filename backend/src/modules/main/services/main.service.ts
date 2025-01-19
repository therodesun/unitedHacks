import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  private readonly users = [
    {
        id: 1,
        firstName: "Alice",
        lastName: "Johnson",
        education: "B.Sc. in Computer Science",
        skills: "React, Node.js, Python",
        experience: "3 years",
        location: "New York",
        salary: "$80,000/year",
        profileImage: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: 2,
        firstName: "Carlos",
        lastName: "Gonzalez",
        education: "M.Sc. in Data Science",
        skills: "Python, SQL, Machine Learning",
        experience: "5 years",
        location: "San Francisco",
        salary: "$120,000/year",
        profileImage: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: 3,
        firstName: "Emma",
        lastName: "Brown",
        education: "B.A. in Marketing",
        skills: "SEO, Google Analytics, Content Writing",
        experience: "4 years",
        location: "Chicago",
        salary: "$70,000/year",
        profileImage: "https://i.pravatar.cc/150?img=3",
      },
      {
        id: 4,
        firstName: "Mohammed",
        lastName: "Khan",
        education: "Ph.D. in Artificial Intelligence",
        skills: "Deep Learning, TensorFlow, NLP",
        experience: "8 years",
        location: "Toronto",
        salary: "$150,000/year",
        profileImage: "https://i.pravatar.cc/150?img=8",
      },
      {
        id: 5,
        firstName: "Li",
        lastName: "Wang",
        education: "B.Eng. in Software Engineering",
        skills: "Java, Spring Boot, Microservices",
        experience: "6 years",
        location: "Seattle",
        salary: "$110,000/year",
        profileImage: "https://i.pravatar.cc/150?img=9",
      },
    ];


  getFirstFiveUsers() {
    return this.users.slice(0, 5);
  }
}