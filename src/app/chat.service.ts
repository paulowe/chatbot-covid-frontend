import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DialogflowSimpleResponse} from './dialogflow-simple-response';
import {DialogflowResponse} from './dialogflow-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {}
  private sessionId = '';

  public async callChatbotWithUserInput(queryText: string): Promise<DialogflowSimpleResponse> {

    return new Promise(((resolve, reject) => {
      this.http.post<DialogflowResponse>('https://dcqwoxj2sh.execute-api.us-west-1.amazonaws.com/dev/client', {
        queryText,
        sessionId: this.sessionId
      }).subscribe(dialogFlowResponse => {
        this.sessionId = dialogFlowResponse.sessionId;
        resolve(new DialogflowSimpleResponse().constructFromDialogFlowResponse(dialogFlowResponse));
      }, error => {
        reject(error);
      });
    }));
  }

}
