import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../authorization.service'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from 'rxjs';

@Component({
    selector: 'app-lessons-list',
    templateUrl: './lessons-list.component.html',
    styleUrls: ['./lessons-list.component.sass'],
})
export class LessonsListComponent implements OnInit {

    addHWShow: boolean = false;
    addHWForm: FormGroup;
    lessonsList;
    showRedirect = false;
    timerRedirect: number = 0;

    token = new Observable(
        data => {
            data.next(localStorage.getItem('token'))
        }
    )

    constructor(private addHWFormBuilder: FormBuilder,
                private lessonService: AuthorizationService,
                private router: Router) {
    }


    private initForm(): void {
        this.addHWForm = this.addHWFormBuilder.group({
            lesson: [null, [
                Validators.required,
            ]],
            createDate: [null, [
                Validators.required,
            ]],
            endDate: [null, [
                Validators.required,
            ]],
            textTask: [null, [
                Validators.required,
            ]],
        })
    }


    showHomeWork(id) {
        this.addHWShow = true;
        // this.choseId = id;
        this.addHWForm.get('lesson').setValue(id);
    }

    closeHomeWork() {
        this.addHWShow = false;
    }

    addHomeWork() {
        this.lessonService.postAddHomeWork(this.addHWForm.value).subscribe(
            () => {
                this.addHWForm.reset();
                this.addHWShow = false;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    ngOnInit() {
        this.initForm();
        this.addHWShow = false;

        this.lessonService.getLessonsList().subscribe(
            (data) => {
                this.lessonsList = data;
                this.showRedirect = false;
            },
            (error) => {
                this.lessonsList = null;
                this.showRedirect = true;
                let timerInterval = setInterval( () => {
                    this.timerRedirect += 1;
                    if(this.timerRedirect == 110) {
                        clearInterval(timerInterval);
                        this.router.navigate(['auth']);
                    } else {

                    };
                }, 20);
            }
        );
    }
}
