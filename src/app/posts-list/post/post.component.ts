import {Component, Input} from '@angular/core';
import {Post} from '../../models/post-model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent  {

  @Input({required:true}) postDetails!:Post




  post = [{
    id: null,
    userId: 1,
    content: "  Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n" +
      "    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\n" +
      "    when an unknown printer took a galley of type and scrambled it to make a type\n" +
      "    specimen book. It has survived not only five centuries, but also the leap into\n" +
      "    electronic."
  }, {
    id: null,
    userId: 1,
    content: "  Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n" +
      "    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\n" +
      "    when an unknown printer took a galley of type and scrambled it to make a type\n" +
      "    specimen book. It has survived not only five centuries, but also the leap into\n" +
      "    electronic."
  }, {
    id: null,
    userId: 1,
    content: "  Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n" +
      "    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\n" +
      "    when an unknown printer took a galley of type and scrambled it to make a type\n" +
      "    specimen book. It has survived not only five centuries, but also the leap into\n" +
      "    electronic."
  }];
}
