package Backend.service;

import Backend.memory.QdrantService;
import Backend.model.MeetingAnalysisResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingAnalysisService {
    
    @Autowired
    private QdrantService qdrantService;

    @Autowired
    private AIService aiService;

    public MeetingAnalysisResponse analyze(String transcript) {

        String summary = aiService.generateSummary(transcript);

        List<String> tasks = aiService.extractTasks(transcript);
        List<String> decisions = aiService.extractDecisions(transcript);
        List<String> risks = aiService.extractRisks(transcript);

        String mood = aiService.detectMood(transcript);

        return new MeetingAnalysisResponse(summary, tasks, decisions, risks, mood);
    }
}