package Backend.controller;

import Backend.model.MeetingAnalysisResponse;
import Backend.model.MeetingRequest;
import Backend.service.MeetingAnalysisService;
import Backend.memory.QdrantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class AnalysisController {

    @Autowired
    private MeetingAnalysisService meetingAnalysisService;

    @Autowired
    private QdrantService qdrantService;

    @PostMapping("/analyze")
    public MeetingAnalysisResponse analyzeMeeting(@RequestBody MeetingRequest request) {

        MeetingAnalysisResponse response =
        meetingAnalysisService.analyze(request.getTranscript());

    qdrantService.storeMemory(
        request.getTranscript(),
        response.getSummary()
);

return response;
    }
}