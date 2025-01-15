// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MaterialModule } from '../../../angular-material/material.module';
// import { BrowserModule } from '@angular/platform-browser';

// @Component({
//   selector: 'app-test-icap',
//   templateUrl: './test-icap.component.html',
//   styleUrls: ['./test-icap.component.css'],
//   imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, BrowserModule],
//   standalone: true

// })
// export class TestIcapComponent implements OnInit {
//   testForm!: FormGroup;
//   totalScore: number = 0;

//   questions = [
//     { text: 'Pregunta 1', options: [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }] },
//     { text: 'Pregunta 2', options: [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }] },
//     { text: 'Pregunta 3', options: [{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 }] },
//   ];

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.testForm = this.fb.group({
//       responses: this.fb.array(
//         this.questions.map(() => this.fb.control(null, Validators.required))
//       ),
//     });

//     this.testForm.get('responses')?.valueChanges.subscribe((values: number[]) => {
//       this.totalScore = values.reduce((sum, value) => sum + (value || 0), 0);
//     });
//   }

//   get responses(): FormArray {
//     return this.testForm.get('responses') as FormArray;
//   }

//   submitForm(): void {
//     if (this.testForm.valid) {
//       console.log('Form submitted:', this.testForm.value);
//     }
//   }
// }

// test.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../angular-material/material.module';

interface Question {
  id: number;
  text: string;
  points: number[];
}

interface ScoreDescription {
  score: number;
  title: string;
  description: string;
}


@Component({
  selector: 'app-test',
  templateUrl: `test-icap.component.html`,
  styleUrl: 'test-icap.component.css',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, MaterialModule]
})
export default class TestComponent implements OnInit {
  testForm: FormGroup;
  readonly panelOpenState = signal(false);


  scoreDescriptions: ScoreDescription[] = [
    {
      score: 0,
      title: 'Nunca o rara vez',
      description: 'Aún pidiéndoselo, no realiza la actividad'
    },
    {
      score: 1,
      title: 'La realiza, aunque no bien',
      description: '1-4 de las veces tal vez necesite que se le pida que lo haga'
    },
    {
      score: 2,
      title: 'La realiza bien',
      description: '3/4 de las veces tal vez necesite que se le pida que lo haga'
    },
    {
      score: 3,
      title: 'La realiza muy bien',
      description: 'Siempre o casi siempre sin que se le pida ayuda'
    }
  ];

  questions: Question[] = [
    {
      id: 1,
      text: 'Coge objetos pequeños con la mano',
      points: [1, 2, 3, 4, 5]
    },
    {
      id: 2,
      text: 'Pasa objetos pequeños de una mano a la otra',
      points: [1, 2, 3, 4, 5]
    },
    {
      id: 3,
      text: 'Muestra capacidad de adaptación ante cambios y nuevos desafíos',
      points: [1, 2, 3, 4, 5]
    },
    {
      id: 4,
      text: "Se sienta sólo mantiene la cabeza y la espalda derecha y firmes durante 30 segundos",
      points: [1,2,3,4,5]
      },
      {
      id: 5,
      text: "Se mantiene de pie al menos durante cinco segundos apoyándose en muebles u otros objetos",
      points: [1,2,3,4,5]
      },
      {
      id: 6,
      text: "Se pone en pie por sí mismo",
      points: [1,2,3,4,5]
      },
      {
      id: 7,
      text: "Mete objetos pequeños en recipientes y lo vuelve a sacar después",
      points: [1,2,3,4,5]
      },
      {
      id: 8,
      text: "Se mantiene de pie sin ayuda y camina al menos unos 2 m",
      points: [1,2,3,4,5]
      },
      {
      id: 9,
      text: "Hace rayas marca o garabatos con lápiz o con pinturas en una hoja de papel",
      points: [1,2,3,4,5]
      },
      {
      id: 10,
      text: "Quita el envoltorio de objetos pequeños como chicles o caramelos ",
      points: [1,2,3,4,5]
      },
      {
      id: 11,
      text: "Gira las manillas de las puertas y las abre ",
      points: [1,2,3,4,5]
      },
      {
      id: 12,
      text: "Sube y baja escaleras aunque sea agarrándose a la barandilla al estrenando los pies de un escalón a otro ",
      points: [1,2,3,4,5]
      },
      {
      id: 13,
      text: "Sube por una escalera de 2 m de altura por ejemplo la de un tobogán o la de una escalera de tijera ",
      points: [1,2,3,4,5]
      },
      {
      id: 14,
      text: "Corta con tijeras siguiendo una línea recta y gruesa ",
      points: [1,2,3,4,5]
      },
      {
      id: 15,
      text: "Escribe su nombre copiándole de un modelo ",
      points: [1,2,3,4,5]
      },
      {
      id: 16,
      text: "Levanta y lleva una bolsa llena de comestibles por lo menos a una distancia de 6 m y la deposita en el suelo ",
      points: [1,2,3,4,5]
      },
      {
      id: 17,
      text: "Dobla una carta en tres partes iguales le introducen un sobre y luego lo cierra ",
      points: [1,2,3,4,5]
      },
      {
      id: 18,
      text: "Enhebra una aguja de coser ",
      points: [1,2,3,4,5]
      },
      {
      id: 18,
      text: "Arma objetos de por lo -10 piezas que deben ser atornilladas o encajadas entre sí con tuercas y tornillos por ejemplo juguetes y muebles desarmados",
      points: [1,2,3,4,5]
      }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const formGroup: any = {};
    this.questions.forEach(question => {
      formGroup['q' + question.id] = [''];
    });
    this.testForm = this.fb.group(formGroup);
  }

  getTotalScore(): number {
    let total = 0;
    this.questions.forEach(question => {
      const value = this.testForm.get('q' + question.id)?.value;
      if (value) {
        total += value;
      }
    });
    return total;
  }

  getMaxScore(): number {
    return this.questions.length * Math.max(...this.questions[0].points);
  }

  submitTest() {
    if (this.testForm.valid) {
      const score = this.getTotalScore();
      const maxScore = this.getMaxScore();
      const percentage = ((score / maxScore) * 100).toFixed(1);

      this.snackBar.open(
        `Test completado. Puntaje: ${score}/${maxScore} (${percentage}%)`,
        'Cerrar',
        { duration: 5000 }
      );

      // Aquí puedes agregar la lógica para enviar los resultados
      console.log('Resultados:', this.testForm.value);
    }
  }
}

